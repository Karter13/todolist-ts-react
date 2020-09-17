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

        let todoId = '8a4af289-a4c0-40b6-a4fd-c2e9c111ab62';
        todolistAPI.deleteTodo(todoId)
            .then((res) => setState(res.data))

    }, []);

    return <div> {JSON.stringify(state)}</div>
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        let todoId = '811d4762-39c0-4a15-86d4-f18c06af6697';
        let tutle = 'AXIOS';
        todolistAPI.updateTodo(todoId, tutle)
            .then((res) => setState(res.data))

    }, []);

    return <div> {JSON.stringify(state)}</div>
};
