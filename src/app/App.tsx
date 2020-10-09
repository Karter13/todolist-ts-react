import React, {useCallback, useEffect} from 'react';
import styles from './App.module.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType, initializeAppTC} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logoutTC} from '../features/Login/auth-reduce';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [isLoggedIn]);


    if (!isInitialized) {
        return <div className={styles.circular}>
            <CircularProgress/>
        </div>
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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>

            {status === 'loading' && <LinearProgress color="secondary"/>}

            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
