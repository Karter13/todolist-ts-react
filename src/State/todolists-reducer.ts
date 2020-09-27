import {todolistsAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';

type ActionsTypes = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {...action.todolist, filter: 'all'};
            return ([newTodoList, ...state]);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }

        default:
            return state;
    }
};

export const removeTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistID} as const
};
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
};
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const

};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
};
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
};

//THUNK
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
};

export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodo(todoId)
        .then(() => {
            dispatch(removeTodolistAC(todoId))
        })
};

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodo(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
};

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodo(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
};


