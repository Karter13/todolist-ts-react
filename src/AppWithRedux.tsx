import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './State/todolists-reducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from './State/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './State/store';
import {TaskStatuses, TaskType} from './api/todolist-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    console.log('App is called');

    useEffect(() => {
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

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>

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
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            tasks={tasksForTodoList}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
