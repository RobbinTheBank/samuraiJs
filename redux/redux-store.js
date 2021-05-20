import profileReducer from './profileReducer'
import usersReducer from './users-reducer'
import {createStore, combineReducers} from 'redux'
import authReducer from './auth-reducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    authPage: authReducer

})
export const store = createStore(rootReducer)
window.state = store