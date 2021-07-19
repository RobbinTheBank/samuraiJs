import { authAPI, securityAPI } from "../api/api"
import {stopSubmit} from 'redux-form'

export type initialStateType = {
  email: string | null
  userId: number | null
  login: string | null
  isAuth: boolean
  urlCaptcha: string | null
}
type dataObjectSetAuthUserDataActionType = {
  email: string | null
  userId: number | null
  login: string | null
  isAuth: boolean
}
type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  data: dataObjectSetAuthUserDataActionType
}
type dataObjectSetCaptchaUrlActionType = {
  urlCaptcha: string | null
}
type setCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL 
  data: dataObjectSetCaptchaUrlActionType
}
export type loginType = {
  email: string | null
  password: string | null 
  rememberMe: boolean | null
  captcha: string | null
}
const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

let initialState: initialStateType = {
    email: null,
    userId: null,
    login: null,
    isAuth: false,
    urlCaptcha: null,
}
const authReducer = (state = initialState, action: any): initialStateType =>{
    switch(action.type){
        case SET_USER_DATA: 
        case SET_CAPTCHA_URL: 
            return {
                ...state,
                ...action.data,
            }
        default: return state
    }
}
const setAuthUserData = (email: string | null, userId: number | null, login: string | null, isAuth: boolean ): setAuthUserDataActionType=>({
  type: SET_USER_DATA, 
  data: {email, userId, login, isAuth}})
const setCaptchaUrl = (urlCaptcha: string | null): setCaptchaUrlActionType=>({type: SET_CAPTCHA_URL, data: {urlCaptcha}})

export const getAuthUserData = ()=> async (dispatch: any) =>{
    let response = await  authAPI.authMe()
        if(response.data.resultCode === 0){
          let {email, id, login} = response.data.data;
          dispatch(setAuthUserData(email, id, login, true))
        }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) =>{
     let response = await authAPI.authLogin(email, password, rememberMe, captcha)
        if(response.data.resultCode === 0){
          dispatch(getAuthUserData())
          dispatch(setCaptchaUrl(null))
        }else{
          if(response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
          }
          let messages = response.data.messages.length > 0 
            ? response.data.messages
            : 'Some error'
          dispatch(stopSubmit('login', {_error: messages}))
        }
}
export const logout = ()=> async (dispatch: any) =>{
    let response = await authAPI.authLogout()
        if(response.data.resultCode === 0){
          dispatch(setAuthUserData(null, null, null, false))
        }
}
export const getCaptchaUrl = ()=> async (dispatch: any)=>{
  let response = await securityAPI.getCaptchaUrl()
  const urlCaptcha = response.data.url
  dispatch(setCaptchaUrl(urlCaptcha))
}
export default authReducer