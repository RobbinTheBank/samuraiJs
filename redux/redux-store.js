import profileReducer from './profileReducer'
import usersReducer from './users-reducer'
import {createStore, combineReducers} from 'redux'
const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,

})
export const store = createStore(rootReducer)
window.state = store