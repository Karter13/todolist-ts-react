import {action} from '@storybook/addon-actions';
import React from 'react';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'EditableSpan component',
    component: EditableSpan
}

const EditableSpanCallback = action('Value changed');


export const EditableSpanBaseExample = () => {
    return  <EditableSpan title={'Start value'} saveNewTitle={EditableSpanCallback}
        />
};
