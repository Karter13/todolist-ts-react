import React, {useEffect, useState} from 'react'
import {todolistsAPI, UpdateTaskModelType} from '../api/todolist-api';

export default {
    title: 'API'
}

const TODOLIST_ID = 'b799648e-e6ab-4201-b6cb-b2b24a9825c1';
const TASK_ID = 'c638ffaa-576f-4515-8e75-cb262bd79767';
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
    const [title, setTitle] = useState<string>('');

    const createTodolist = () => {
        todolistsAPI.createTodo(title)
            .then(res => {
                setState(res.data)
            })
    };

    return (
        <div> {JSON.stringify(state)}
            <div>
                <input placeholder={'title todolist'} value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <button onClick={createTodolist}>CREATE TODO LIST</button>
            </div>
        </div>
    )
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>('');

    const deleteTodolist = () => {
        todolistsAPI.deleteTodo(todoId)
            .then((res) => setState(res.data))
    };

    return (
        <div> {JSON.stringify(state)}
            <div>
                <input placeholder={'todoId'} value={todoId} onChange={(e) => {
                    setTodoId(e.currentTarget.value)
                }}/>
                <button onClick={deleteTodolist}>DELETE TODOLIST</button>
            </div>
        </div>
    )
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const updateTodolist = () => {
        todolistsAPI.updateTodo(todoId, title)
            .then((res) => setState(res.data))
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todoId'} value={todoId} onChange={e => setTodoId(e.currentTarget.value)}/>
                <input placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                <button onClick={updateTodolist}>UPDATE TODOLIST</button>
            </div>
        </div>
    )
};

//TASKLISTS
export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    };
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
                <button onClick={getTasks}>CET TASK</button>
            </div>
        </div>
    )
};
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => setState(res.data))
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
                <input placeholder={'taskTitle'} value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)}/>
                <button onClick={createTask}>CREATE TASK</button>
            </div>
        </div>
    )
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
                <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
                <button onClick={deleteTask}>DELETE TASK</button>
            </div>
        </div>
    )
};
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const [title, setTitle] = useState<string>('title 1');
    const [description, setDescription] = useState<string>('description 1');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');


    const updateTask = () => {
        const model: UpdateTaskModelType = {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''
        };
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => setState(res.data));
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
                <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
                <input placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value) }/>
                <input placeholder={'description'} value={description} onChange={e => setDescription(e.currentTarget.value) }/>
                <input placeholder={'status'} value={status} type='number' onChange={e => setStatus(+e.currentTarget.value) }/>
                <input placeholder={'priority'} value={priority} type='number' onChange={e => setPriority(+e.currentTarget.value) }/>
                <button onClick={updateTask}>UPDATE TASK</button>
            </div>
        </div>
    )
};
