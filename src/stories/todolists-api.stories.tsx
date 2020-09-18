import React, {useEffect, useState} from 'react'
import {PropertiesType, tasklistAPI, todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}


const TODOLIST_ID = '39ad6b70-7c2e-4422-bf90-f13cb46e0aed';
const TASK_ID = '42478c66-34ec-4f3a-b0b4-e43f24cbf2df';

//TODOLISTS
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

        let todoId = TODOLIST_ID;
        todolistAPI.deleteTodo(todoId)
            .then((res) => setState(res.data))

    }, []);

    return <div> {JSON.stringify(state)}</div>
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        let todoId = TODOLIST_ID;
        let title = 'REDAX';
        todolistAPI.updateTodo(todoId, title)
            .then((res) => setState(res.data))

    }, []);

    return <div> {JSON.stringify(state)}</div>
};


//TASKLISTS
export const GetTaskslist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = TODOLIST_ID;
        tasklistAPI.getTaskslist(todolistId)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
};
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = TODOLIST_ID;
        const titile = 'REDUX';
        tasklistAPI.createTask(todolistId, titile)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = TODOLIST_ID;
        const taskId = TASK_ID;
        tasklistAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = TODOLIST_ID;
        const taskId = TASK_ID;
        const properties: PropertiesType = {
            title: 'REDUX',
            description: '333',
            completed: true,
            status: 0,
            priority: 1,
            startDate: '12.12.19',
            deadline: '2020-09-18T09:16:46.85'
        };
        tasklistAPI.updateTask(todolistId, taskId, properties)
            .then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>
};
