import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../Todolist';

export type ActionType = {
    type: string
    [key: string]: any
}

export const taskReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTask: TaskType = {
                id: v1(),
                title: 'SaSS',
                isDone: false
            };
            let listTask = state[action.taskListID];
            state[action.taskListID] = [...listTask, newTask];
            return {...state};
        case 'REMOVE_TASK':
            return state[action.taskListID].filter(t => t.title !== action.taskTitle);
        default:
            throw new Error('ERROR!!!')
    }

};
