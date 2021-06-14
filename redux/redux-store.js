import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import authReducer from './auth-reducer'
import thunkMiddleWare from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    authPage: authReducer,
    form: formReducer

})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))
window.state = store