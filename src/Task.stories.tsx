import {action} from '@storybook/addon-actions';
import React from 'react';
import {Task} from './Task';

export default {
    title: 'Task component',
    component: Task
}

const changeTaskStatusCallback = action('Status changed');
const changeTaskTitleCallback = action('Title changed');
const removeTaskCallback = action('Task removed');

export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'CSS' }}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
            changeTaskStatus={changeTaskStatusCallback}
        />
        <Task
            task={{id: '2', isDone: false, title: 'React' }}
            todolistId={'todolistId2'}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
            changeTaskStatus={changeTaskStatusCallback}
        />
        </>

};
