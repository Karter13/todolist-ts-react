import axios from 'axios'

//type for Todolist
export type TodolistType = {
    id: string
    title: string
    addedDates: string
    order: number
}
type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>,
    data: T
}

//type for Tasklist
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'bb249f66-6d8f-4cc5-9789-2a998b315ae1'
    }
}
const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
});

export const todolistsAPI = {
    //TODOLIST
    getTodolists() {
        return instanse.get<Array<TodolistType>>(`todo-lists`)
    },
    createTodo(title: string = 'ANGULAR') {
        return instanse.post<CommonResponseType<{ item: TodolistType }>>(`todo-lists`,
            {title})
    },
    deleteTodo(todoId: string) {
        return instanse.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string) {
        return instanse.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    },

    //TASKLIST
    getTasks(todolistId: string) {
        return instanse.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instanse.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instanse.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
};

