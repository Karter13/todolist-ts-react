import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    filter: FilterValuesType,
    addTask: (taskName: string) => void,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    changeTaskStatus: (id: string, isDone: boolean) => void,
}

export function TodoList(props: PropsType) {

    const [taskName, setTaskName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (taskName.trim()) {
            props.addTask(taskName.trim());
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
    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
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

                        const onRemoveHandler = () => props.removeTask(t.id);

                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newCheckBoxValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newCheckBoxValue)
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
