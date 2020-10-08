import React, {useCallback, useEffect} from 'react';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {addTaskTC, removeTaskTC, updateTaskTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolist-api';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {TodoList} from './Todolist/Todolist';
import {TasksStateType} from '../../app/App';
import {Redirect} from 'react-router';

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, []);

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    }, [dispatch]);
    const removeTodoList = useCallback((todoListID: string) => {
        const thunk = removeTodolistTC(todoListID);
        dispatch(thunk);
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(todoListID, newTitle);
        dispatch(thunk);
    }, [dispatch]);
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        const action = changeTodolistFilterAC(todoListID, value);
        dispatch(action);
    }, [dispatch]);

    const addTask = useCallback((taskName: string, todoListID: string) => {
        dispatch(addTaskTC(taskName, todoListID))
    }, [dispatch]);
    const removeTask = useCallback((id: string, todoListID: string) => {
        dispatch(removeTaskTC(todoListID, id))
    }, []);
    const changeTaskTitle = useCallback((id: string, newTitle: string, todoListID: string) => {
        const thunk = updateTaskTC(id, {title: newTitle}, todoListID);
        dispatch(thunk);
    }, [dispatch]);
    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todoListID: string) => {
        const thunk = updateTaskTC(id, {status: status}, todoListID);
        dispatch(thunk);
    }, [dispatch]);


    if (!isLoggedIn) {
        debugger
        return <Redirect to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>

        <Grid container spacing={3}>
            {
                todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id];

                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: '20px'}}
                                   elevation={20}
                            >
                                <TodoList
                                    todolist={tl}
                                    key={tl.id}
                                    tasks={tasksForTodoList}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
};
