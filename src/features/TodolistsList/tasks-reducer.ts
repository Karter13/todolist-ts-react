import {TasksStateType} from '../../app/App';
import {
    addTodolistAC,
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    removeTodolistAC,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: any): TasksStateType => {
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
        case addTodolistAC.type:
            return {...state, [action.payload.todolist.id]: []};
        case removeTodolistAC.type: {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy;
        }
        case setTodolistsAC.type: {
            const stateCopy = {...state};
            action.payload.todolists.forEach((tl: any) => {
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
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            if(res.data.error === null) {
                const tasks = res.data.items;
                dispatch(setTasksAC(tasks, todolistId));
                dispatch(setAppStatusAC({status:'succeeded'}));
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        })
};
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTodolistEntityStatusAC({todoId: todolistId, entityStatus: 'loading'}));
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === RequestStatusesCode1.success) {
                dispatch(removeTaskAC(taskId, todolistId));
                dispatch(setAppStatusAC({status:'succeeded'}));
                dispatch(changeTodolistEntityStatusAC({todoId: todolistId, entityStatus: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        })
};

export enum RequestStatusesCode1 {
    success = 0,
    error = 1
}

export const addTaskTC = (taskName: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTodolistEntityStatusAC({todoId: todoListID, entityStatus: 'loading'}));
    todolistsAPI.createTask(todoListID, taskName)
        .then((res) => {
            if (res.data.resultCode === RequestStatusesCode1.success) {
                dispatch(addTasksAC(res.data.data.item));
                dispatch(setAppStatusAC({status:'succeeded'}));
                dispatch(changeTodolistEntityStatusAC({todoId: todoListID, entityStatus: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        })

};
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        dispatch(changeTodolistEntityStatusAC({todoId: todolistId, entityStatus: 'loading'}));
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
                if (res.data.resultCode === RequestStatusesCode1.success) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC({status:'succeeded'}));
                    dispatch(changeTodolistEntityStatusAC({todoId: todolistId, entityStatus: 'succeeded'}));
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch);
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
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
