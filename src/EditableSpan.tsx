import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType>  = (props) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title);

    const activatedEditMode = () => {
        setEditMode(true);
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
            ? <input value={title} onChange={changeTitle} autoFocus onBlur={deActivatedEditMode}/>
            : <span onDoubleClick={activatedEditMode}>{props.title}</span>
    )
};
