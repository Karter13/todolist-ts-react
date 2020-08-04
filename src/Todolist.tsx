import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {IconButton, Button, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void,
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const onClickRemoveTodoList = () => props.removeTodoList(props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    };

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              saveNewTitle={changeTodoListTitle}
                />
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={onClickRemoveTodoList}>X</button>*/}
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => props.removeTask(t.id, props.id);

                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newCheckBoxValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newCheckBoxValue, props.id)
                        };
                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(t.id, newTitle, props.id)
                        };

                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    color={'primary'}
                                    checked={t.isDone}
                                    onChange={changeStatus}
                                />
                                {/* <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={changeStatus}
                                />*/}
                                <EditableSpan saveNewTitle={changeTaskTitle} title={t.title}/>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                                {/*<button onClick={onRemoveHandler}>x</button>*/}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    variant = {props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'primary'}
                >All
                </Button>
                <Button
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    color={'inherit'}
                >Active
                </Button>
                <Button
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                >Completed
                </Button>
            </div>
        </div>
    )
}
