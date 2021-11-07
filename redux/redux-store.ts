import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'
import {createStore, combineReducers, applyMiddleware, Action} from 'redux'
import authReducer from './auth-reducer'
import thunkMiddleWare, { ThunkAction } from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    authPage: authReducer,
    appPage: appReducer,
    form: formReducer,
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType> 
type PropertisType<T> = T extends {[key: string]: infer U} ? U : never 
export type GetInferActions<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertisType<T>>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))
//@ts-ignore
window.state = store