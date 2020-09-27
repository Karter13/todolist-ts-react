import {TasksStateType} from '../AppWithRedux';
import {addTodolistActionType, removeTodolistActionType, setTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: TasksType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            };
        case 'ADD_TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskListId ? {...t, ...action.model} : t)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            });
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks};
        }
        default:
            return state;
    }
};

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE_TASK', taskId, todolistId} as const);
export const addTasksAC = (task: TaskType) =>
    ({type: 'ADD_TASK', task} as const);
export const updateTaskAC = (taskListId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE_TASK', taskListId, model, todolistId} as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const);


// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items;
            const action = setTasksAC(tasks, todolistId);
            dispatch(action)
        })
};
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
};
export const addTaskTC = (taskName: string, todoListID: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoListID, taskName)
        .then((res) => {
            const task = res.data.data.item;
            dispatch(addTasksAC(task))
        })
};
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(task => task.id === taskId);
        if (!task) {
            // throw new Error('Task not found in the state');
            console.warn('Task not found in the state');
            return;
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel
        };
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })

    };

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | removeTodolistActionType
    | addTodolistActionType
    | setTodolistsActionType
