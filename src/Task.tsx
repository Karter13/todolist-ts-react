import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';

type TaskPropsType = {
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newCheckBoxValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newCheckBoxValue, props.todolistId)

    };

    const onTitleChangeHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.task.id, props.todolistId, props.changeTaskTitle]);

    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                color={'primary'}
                checked={props.task.isDone}
                onChange={onChangeHandler}
            />

            <EditableSpan saveNewTitle={onTitleChangeHandler} title={props.task.title}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>props.task
        </div>
    )
});
