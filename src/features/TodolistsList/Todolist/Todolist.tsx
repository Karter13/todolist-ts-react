import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolist-api';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../tasks-reducer';
import {RequestStatusType} from '../../../app/app-reducer';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    addTask: (taskName: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    demo?: boolean
}

export const TodoList: React.FC<PropsType> = React.memo(({demo = false, ...props}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id));
    }, []);

    console.log('Todolist is called');

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id]);

    const onClickRemoveTodoList = useCallback(() => props.removeTodoList(props.todolist.id), [props.removeTodoList, props.todolist.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id);
    }, [props.addTask, props.todolist.id]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props.changeTodoListTitle, props.todolist.id]);

    let tasksForTodoList = props.tasks;
    if (props.todolist.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title}
                              saveNewTitle={changeTodoListTitle}
                />
                <IconButton onClick={onClickRemoveTodoList} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTask} entityStatus={props.todolist.entityStatus}/>

            <div>
                {
                    tasksForTodoList.map(t => <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolist.id}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                    />)
                }
            </div>
            <div>
                <Button
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'primary'}
                >All
                </Button>
                <Button
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                    variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    color={'inherit'}
                >Active
                </Button>
                <Button
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                    variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                >Completed
                </Button>
            </div>
        </div>
    )
});


