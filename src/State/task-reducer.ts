import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../Todolist';

export type ActionType = {
    type: string
    [key: string]: any
}

export type TasksType = AddTaskType | RemoveTaskType | ChangeTaskTitleType | ChangeTaskStatusType

export type AddTaskType = {
    type: 'ADD_TASK'
    id: string
}
export type RemoveTaskType = {
    type: 'REMOVE_TASK'
    taskListId: string,
    id: string
}
export  type ChangeTaskTitleType = {
    type: 'CHANGE_TASK_TITLE'
    taskListId: string,
    id: string
    title: string
}
export  type ChangeTaskStatusType = {
    type: 'CHANGE_TASK_STATUS'
    taskListId: string,
    id: string
    isDone: boolean
}

export const taskReducer = (state: TasksStateType, action: TasksType): TasksStateType => {
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: 'SaSS',
                isDone: false
            };
            let listTask = state[action.id];
            state[action.id] = [...listTask, newTask];
            return {...state};
        }
        case 'REMOVE_TASK': {
            state[action.taskListId] = state[action.taskListId].filter(t => t.id !== action.id);
            return {...state}
        }
        case 'CHANGE_TASK_TITLE': {
            let listTasks = state[action.taskListId];
            let task = listTasks.find(t => t.id === action.id)
            if (task) {
                task.title = action.title
            }
            return {...state}
        }
        case 'CHANGE_TASK_STATUS': {
            let listTasks = state[action.taskListId];
            let task = listTasks.find(t => t.id === action.id)
            if(task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        default:
            throw new Error('ERROR!!!')
    }
};

export const AddTaskAC = (id: string): AddTaskType => {
    return {type: 'ADD_TASK', id: id}
};
export const RemoveTaskAC = (taskListID: string, id: string): RemoveTaskType => {
    return {type: 'REMOVE_TASK', taskListId: taskListID, id: id}
};
export const ChangeTaskTitleAC = (taskListID: string, id: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE_TASK_TITLE', taskListId: taskListID, id: id, title: title}
};
export const ChangeTaskStatusAC = (taskListID: string, id: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE_TASK_STATUS', taskListId: taskListID, id: id, isDone: isDone}
};

