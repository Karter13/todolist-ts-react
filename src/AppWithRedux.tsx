import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './State/todolists-reducer';
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './State/tasks-reducer';

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

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to by', filter: 'all'},
    ]);
    let [tasks, dispatchToTasks] =useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'SaSS', isDone: false},
            {id: v1(), title: 'React API', isDone: false},
            {id: v1(), title: 'Redax', isDone: false},
        ],
    });


    function addTodoList(title: string) {
        const action = addTodolistAC(title);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodolistAC(todoListID);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        const action = changeTodolistTitleAC(todoListID, newTitle);
        dispatchToTodoLists(action);
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = changeTodolistFilterAC(todoListID, value);
        dispatchToTodoLists(action);
    }

    function addTask(taskName: string, todoListID: string) {
        const action = addTasksAC(taskName, todoListID);
        dispatchToTasks(action);
    }

    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID);
        dispatchToTasks(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        const action = changeTaskTitleAC(id, newTitle, todoListID);
        dispatchToTasks(action);
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(id, isDone, todoListID);
        dispatchToTasks(action);
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
