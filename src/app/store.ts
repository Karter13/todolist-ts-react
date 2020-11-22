import thunkMiddleware from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from './reducers';



export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

