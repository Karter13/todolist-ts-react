import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import {RequestStatusType} from '../../app/app-reducer';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus: RequestStatusType
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {

    console.log('AddItemForm called');

    const [itemName, setItemName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (itemName.trim()) {
            props.addItem(itemName.trim());
            setItemName('');
        } else {
            setError('Title is required!');
        }
    };

    const onChangedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemName(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    };

    return (
        <div>
            <TextField
                variant={'outlined'}
                value={itemName}
                onChange={onChangedHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={'Title'}
                helperText={error}
                disabled={props.entityStatus === 'loading'}
            />

            <IconButton color={'primary'} onClick={addItem} disabled={props.entityStatus === 'loading'}>
                <AddBox/>
            </IconButton>

        </div>
    )
});
