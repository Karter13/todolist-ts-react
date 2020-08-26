import React from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './State/todolists-reducer';
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './State/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './State/store';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    function addTodoList(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodolistAC(todoListID);
        dispatch(action);
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        const action = changeTodolistTitleAC(todoListID, newTitle);
        dispatch(action);
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = changeTodolistFilterAC(todoListID, value);
        dispatch(action);
    }

    function addTask(taskName: string, todoListID: string) {
        const action = addTasksAC(taskName, todoListID);
        dispatch(action);
    }

    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID);
        dispatch(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        const action = changeTaskTitleAC(id, newTitle, todoListID);
        dispatch(action);
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(id, isDone, todoListID);
        dispatch(action);
    }

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
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }

                            return (
                                <Grid item>
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
