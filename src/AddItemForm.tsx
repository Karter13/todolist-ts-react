import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

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
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    };

    return (
        <div>
            <input
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
};
