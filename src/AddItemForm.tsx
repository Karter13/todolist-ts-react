import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
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
    const onItemNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setItemName(e.currentTarget.value);
    };
    const onAddItemKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null)
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    };

    return (
        <div>
            <TextField
                variant={'outlined'}
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                // className={error ? 'error' : ''}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            {/*<input
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                className={error ? 'error' : ''}
            />*/}
            {/*<Button onClick={addItem} variant={'contained'} color={'primary'}>+</Button>*/}
            <IconButton color={'primary'} onClick={addItem}>
                <AddBox/>
            </IconButton>

            {/*<button onClick={addItem}>+</button>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
});
