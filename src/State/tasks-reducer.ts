import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistActionType, RemuveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';

export type TasksType =
    AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemuveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}
export  type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskListId: string
    todolistId: string
    status: TaskStatuses
}
export  type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskListId: string
    todolistId: string
    title: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: TasksType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = action.tasks;
            return stateCopy
        }
        case 'REMOVE_TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const filteredTasks = tasks.filter(task => task.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD_TASK': {
            const stateCopy = {...state};
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            };
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE_TASK_STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskListId ? {
                ...t,
                status: action.status
            } : t);
            return stateCopy;
        }
        case 'CHANGE_TASK_TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskListId ? {...t, title: action.title} : t);
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            });
            return stateCopy;
        }

        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todolistId}
};
export const addTasksAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todolistId}
};
export const changeTaskStatusAC = (taskListId: string, status: TaskStatuses, todolistId: string,): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskListId, status, todolistId}
};
export const changeTaskTitleAC = (taskListId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskListId, todolistId, title}
};


export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
};


//THUNK
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {

        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items;
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
};

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                debugger;
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
};


//START
export const addTaskTC = (todolistId: string, taskTitle: string) => {
    return(dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTasksAC(taskTitle, todolistId))
            })
    }
}
