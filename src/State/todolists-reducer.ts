import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type ActionsTypes = RemuveTodolistActionType | AddTodolistActionType |
    ChangeTodolistActionType | ChangeTodolistFilterActionType

export type RemuveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoListID = v1();
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all'
            };
            return ([...state, newTodoList]);
        case 'CHANGE-TODOLIST-TITLE':
            const todoList1 = state.find(tl => tl.id === action.id);
            if (todoList1) {
                todoList1.title = action.title;
            }
            return [...state];
        //with map
        // return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo);
        case 'CHANGE-TODOLIST-FILTER':
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state];
        //with map
        // return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        default:
            throw new Error('Error!!!');
    }
};

export const removeTodolistAC = (todolistID: string): RemuveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID}
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}

};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
};
