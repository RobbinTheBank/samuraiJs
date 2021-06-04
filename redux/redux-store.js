import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import authReducer from './auth-reducer'
import thunkMiddleWare from 'redux-thunk'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    authPage: authReducer

})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))
window.state = store