import profileReducer from './reucers/profile-reducer'
import usersReducer from './reucers/users-reducer'
import {createStore, combineReducers, applyMiddleware, Action} from 'redux'
import authReducer from './reucers/auth-reducer'
import thunkMiddleWare, { ThunkAction } from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './reucers/app-reducer'
import dialogsReducer from './reucers/dialogs-reducer'

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