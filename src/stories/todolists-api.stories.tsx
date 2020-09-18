import React, {useEffect, useState} from 'react'
import {todolistsAPI, UpdateTaskType} from '../api/todolist-api';

export default {
    title: 'API'
}

const TODOLIST_ID = '39ad6b70-7c2e-4422-bf90-f13cb46e0aed';
const TASK_ID = '42478c66-34ec-4f3a-b0b4-e43f24cbf2df';

//TODOLISTS
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        const title = 'REACT'
        todolistsAPI.createTodo(title)
            .then(res => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.

        let todoId = TODOLIST_ID;
        todolistsAPI.deleteTodo(todoId)
            .then((res) => setState(res.data))

    }, []);

    return <div> {JSON.stringify(state)}</div>
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        let todoId = TODOLIST_ID;
        let title = 'REDAX';
        todolistsAPI.updateTodo(todoId, title)
            .then((res) => setState(res.data))

    }, []);

    return <div> {JSON.stringify(state)}</div>
};


//TASKLISTS
export const GetTasks = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = TODOLIST_ID;
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                debugger;
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
};
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = TODOLIST_ID;
        const titile = 'REDUX';
        todolistsAPI.createTask(todolistId, titile)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = TODOLIST_ID;
        const taskId = TASK_ID;
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
};
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = TODOLIST_ID;
        const taskId = TASK_ID;
        const properties: UpdateTaskType = {
            title: 'REDUX',
            description: '333',
            status: 0,
            priority: 1,
            startDate: '12.12.19',
            deadline: '2020-09-18T09:16:46.85'
        };
        todolistsAPI.updateTask(todolistId, taskId, properties)
            .then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>
};
