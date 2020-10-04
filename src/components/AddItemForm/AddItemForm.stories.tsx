import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';
import React from 'react';

export default {
    title: 'AddItemForm component',
    component: AddItemForm
}

export const AddItemFormBaseExample = (props: any) => {
    return (
        <AddItemForm
            addItem={action('Button inside from clicked')}
    />)
};

export const AddItemFormDiasabledExample = (props: any) => {
    return (
        <AddItemForm
            disabled={true}
            addItem={action('Button inside from clicked')}
        />)
};
