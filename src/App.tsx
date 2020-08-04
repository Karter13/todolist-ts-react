import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to by', filter: 'all'},
    ]);
    let [tasks, setTasks] = useState<TaskStateType>({
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
        let newTodoListID = v1();
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        };
        setTodoLists([newTodoList, ...todoLists]);

        setTasks({...tasks, [newTodoListID]: []})
    }

    function removeTodoList(todoListID: string) {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListID);
        setTodoLists(filteredTodoList);

        delete tasks[todoListID];
        setTasks({...tasks});
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function addTask(taskName: string, todoListID: string) {

        let newTask = {id: v1(), title: taskName, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }

    function removeTask(id: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
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

export default App;
