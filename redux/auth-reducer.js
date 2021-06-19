import { authAPI, usersAPI } from "../api/api"
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA'
let initialState = {
    email: null,
    userId: null,
    login: null,
    isAuth: false
}
const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.data,
            }
        default: return state
    }
}
const setAuthUserData = (email, userId, login, isAuth)=>({type: SET_USER_DATA, data: {email, userId, login, isAuth}})
export const getAuthUserData = ()=>(dispatch) =>{
    return  authAPI.authMe()
      .then(response=>{
        if(response.data.resultCode === 0){
          let {email, id, login} = response.data.data;
          dispatch(setAuthUserData(email, id, login, true))
        }
      })
}
export const login = (email, password, rememberMe)=>(dispatch) =>{
    authAPI.authLogin(email, password, rememberMe, true)
      .then(response=>{
        if(response.data.resultCode === 0){
          dispatch(getAuthUserData())
        }else{
          let messages = response.data.messages.length > 0 ? response.data.messages: 'Some error'
          dispatch(stopSubmit('login', {_error: messages}))
        }
      })
}
export const logout = ()=>(dispatch) =>{
    authAPI.authLogout()
      .then(response=>{
        if(response.data.resultCode === 0){
          dispatch(setAuthUserData(null, null, null, false))
        }
      })
}
export default authReducer