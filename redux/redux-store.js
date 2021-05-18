import profileReducer from './profileReducer'
import {createStore, combineReducers} from 'redux'
const rootReducer = combineReducers({
    profilePage: profileReducer,
})
export const store = createStore(rootReducer)
window.state = store