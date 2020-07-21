import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    filter: FilterValuesType,
    addTask: (taskName: string, todoListID: string) => void,
    removeTask: (id: string, todoListID: string) => void,
    changeFilter: (value: FilterValuesType, todoListID: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void,
    removeTodoList: (todoListID: string) => void
}

export function TodoList(props: PropsType) {

    const [taskName, setTaskName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (taskName.trim()) {
            props.addTask(taskName.trim(), props.id);
            setTaskName('');
        } else {
            setError('Title is required!');
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value);

    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    };
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const onClickRemoveTodoList = () => props.removeTodoList(props.id);

    return (
        <div>
            <h3>{props.title}
                <button onClick={onClickRemoveTodoList}>X</button>
            </h3>
            <div>
                <input
                    value={taskName}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => props.removeTask(t.id, props.id);

                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newCheckBoxValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newCheckBoxValue, props.id)
                        };
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={changeStatus}
                                />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
