import axios from 'axios'

type TodoType = {
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

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bb249f66-6d8f-4cc5-9789-2a998b315ae1'
    }
});

export const todolistAPI = {
    getTodolists() {
        return instanse.get<Array<TodoType>>(`todo-lists`)
    },

    createTodo(title: string = 'ANGULAR') {
        return instanse.post<CommonResponseType<{item: TodoType}>>(`todo-lists`,
            {title})
    },

    deleteTodo(todoId: string) {
        return instanse.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },

    updateTodo(todoId: string, title: string) {
        return instanse.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    },

};
