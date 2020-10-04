import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import {RequestStatusType} from '../../app/app-reducer';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, disabled = false}) => {

    console.log('AddItemForm called');

    const [itemName, setItemName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        if (itemName.trim()) {
            addItem(itemName.trim());
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
            addItemHandler();
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
                disabled={disabled}
            />

            <IconButton color={'primary'} onClick={addItemHandler} disabled={disabled}>
                <AddBox/>
            </IconButton>

        </div>
    )
});
