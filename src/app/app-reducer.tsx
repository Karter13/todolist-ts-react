import {authAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {setIsLoggedInAC} from '../features/Login/auth-reduce';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false

};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized};
        default:
            return state
    }
};

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const);


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
        dispatch(setIsInitializedAC(true))
    })
};


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetIsInitializedActionType


