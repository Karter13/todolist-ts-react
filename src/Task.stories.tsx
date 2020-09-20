import {action} from '@storybook/addon-actions';
import React from 'react';
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from './api/todolist-api';

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
            task={{id: '1', status: TaskStatuses.Completed, title: 'CSS', todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
            changeTaskStatus={changeTaskStatusCallback}
        />
        <Task
            task={{id: '2', status: TaskStatuses.New, title: 'React', todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }}
            todolistId={'todolistId2'}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
            changeTaskStatus={changeTaskStatusCallback}
        />
        </>

};
