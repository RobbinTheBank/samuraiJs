import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import authReducer from './auth-reducer'
import thunkMiddleWare from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    authPage: authReducer,
    appPage: appReducer,
    form: formReducer,
    

})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))
window.state = store