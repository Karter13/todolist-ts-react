import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

export type EditableSpanPropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title);

    const activatedEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    };
    const deActivatedEditMode = () => {
        setEditMode(false);
        props.saveNewTitle(title);
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return (
        editMode
            ? <TextField
                variant={'outlined'}
                value={title}
                onChange={changeTitle}
                autoFocus
                onBlur={deActivatedEditMode}
            />
            : <span onDoubleClick={activatedEditMode}>{props.title}</span>
    )
});
