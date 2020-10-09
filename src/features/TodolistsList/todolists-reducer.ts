import {todolistsAPI, TodolistType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {RequestStatusesCode1} from './tasks-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return ([{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'CHANGE-TODOLISTS-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.todoId ? {...tl, entityStatus: action.entityStatus} : tl);
        }
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }));
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
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLISTS-ENTITY-STATUS', todoId, entityStatus} as const);


// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.getTodolists()
        .then((data) => {
            dispatch(setTodolistsAC(data));
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
};
export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todoId, 'loading'));
    todolistsAPI.deleteTodo(todoId)
        .then((res) => {
            if (res.data.resultCode === RequestStatusesCode1.success) {
                dispatch(removeTodolistAC(todoId));
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === RequestStatusesCode1.success) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })

};
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(id, 'loading'));
    todolistsAPI.updateTodo(id, title)
        .then((res) => {
            if(res.data.resultCode === RequestStatusesCode1.success) {
                dispatch(changeTodolistTitleAC(id, title));
                dispatch(setAppStatusAC('succeeded'));
                dispatch(changeTodolistEntityStatusAC(id, 'succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
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
    | SetAppStatusActionType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
