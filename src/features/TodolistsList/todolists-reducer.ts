import {todolistsAPI, TodolistType} from '../../api/todolist-api';
import {Dispatch} from 'redux';

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return ([{...action.todolist, filter: 'all'}, ...state]);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        default:
            return state;
    }
};

// actions
export const removeTodolistAC = (todolistID: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistID} as const);
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const);
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const);
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const);

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
};
export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodo(todoId)
        .then(() => {
            dispatch(removeTodolistAC(todoId))
        })
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodo(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })

};
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodo(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })

};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
