import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        todolistAPI.getTodolists()
            .then((res) => setState(res.data))
    }, []);

    return <div> {JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        const title = 'REACT'
        todolistAPI.createTodo(title)
            .then(res => setState(res.data))
    }, []);

    return <div> {JSON.stringify(state)}</div>
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.

        let todoId = '40aae3fb-89a3-47b5-ad70-1cf06dd08eba';
        todolistAPI.deleteTodo(todoId)
            .then((res) => setState(res.data))

    }, []);

    return <div> {JSON.stringify(state)}</div>
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        let todoId = '40aae3fb-89a3-47b5-ad70-1cf06dd08eba';
        let title = 'REDAX';
        todolistAPI.updateTodo(todoId, title)
            .then((res) => setState(res.data))

    }, []);

    return <div> {JSON.stringify(state)}</div>
};


