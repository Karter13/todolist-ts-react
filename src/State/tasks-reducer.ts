import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../Todolist';

export type TasksType = AddTaskType | RemoveTaskActionType | ChangeTaskTitleType | ChangeTaskStatusType

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}
export type AddTaskType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}
export  type ChangeTaskTitleType = {
    type: 'CHANGE_TASK_TITLE'
    taskListId: string
    id: string
    title: string
}
export  type ChangeTaskStatusType = {
    type: 'CHANGE_TASK_STATUS'
    taskListId: string
    id: string
    isDone: boolean
}

export const tasksReducer = (state: TasksStateType, action: TasksType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const filteredTasks = tasks.filter(task => task.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD_TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE_TASK_TITLE': {

            return {...state}
        }
        case 'CHANGE_TASK_STATUS': {

            return {...state}
        }
        default:
            throw new Error('ERROR!!!')
    }
};


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todolistId}
};
export const addTasksAC = (title: string, todolistId: string): AddTaskType => {
    return {type: 'ADD_TASK', title, todolistId}
};
export const changeTaskTitleAC = (taskListID: string, id: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE_TASK_TITLE', taskListId: taskListID, id: id, title: title}
};
export const changeTaskStatusAC = (taskListID: string, id: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE_TASK_STATUS', taskListId: taskListID, id: id, isDone: isDone}
};

