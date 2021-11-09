import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'
import {createStore, combineReducers, applyMiddleware, Action} from 'redux'
import authReducer from './auth-reducer'
import thunkMiddleWare, { ThunkAction } from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'
import dialogsReducer from './dialogs-reducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    authPage: authReducer,
    appPage: appReducer,
    dialogsPage: dialogsReducer,
    form: formReducer,
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType> 
export type GetInferActions<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))
//@ts-ignore
window.state = store