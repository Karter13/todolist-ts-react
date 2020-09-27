import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolist-api';
import {FilterValuesType} from '../todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../tasks-reducer';


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (taskName: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList: React.FC<PropsType> = React.memo((props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id));
    }, []);

    console.log('Todolist is called');

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);

    const onClickRemoveTodoList = useCallback(() => props.removeTodoList(props.id), [props.removeTodoList, props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id]);

    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              saveNewTitle={changeTodoListTitle}
                />
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {
                    tasksForTodoList.map(t => <Task
                        key={t.id}
                        task={t}
                        todolistId={props.id}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                    />)
                }
            </div>
            <div>
                <Button
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'primary'}
                >All
                </Button>
                <Button
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    color={'inherit'}
                >Active
                </Button>
                <Button
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                >Completed
                </Button>
            </div>
        </div>
    )
});


