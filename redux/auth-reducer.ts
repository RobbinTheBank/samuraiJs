import { authAPI, securityAPI } from "../api/api"
import { FormAction, stopSubmit } from 'redux-form'
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

type dataObjectSetAuthUserDataActionType = {
  email: string | null
  userId: number | null
  login: string | null
  isAuth: boolean
}

type dataObjectSetCaptchaUrlActionType = {
  urlCaptcha: string | null
}

type ActionsTypes = setAuthUserDataActionType | setCaptchaUrlActionType | FormAction

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export type loginType = {
  email: string | null
  password: string | null
  rememberMe: boolean | null
  captcha: string | null
}
const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

let initialState = {
  email: null as (string | null),
  userId: null as number | null,
  login: null as string | null,
  isAuth: false,
  urlCaptcha: null as string | null,
}
const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.data
      }
    default: return state
  }
}

const setAuthUserData = (email: string | null, userId: number | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({type: SET_USER_DATA, data: { email, userId, login, isAuth }})
type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  data: dataObjectSetAuthUserDataActionType 
}

const setCaptchaUrl = (urlCaptcha: string | null): setCaptchaUrlActionType => ({ type: SET_CAPTCHA_URL, data: {urlCaptcha} })
type setCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL
  data: dataObjectSetCaptchaUrlActionType
}

export const getAuthUserData = (): ThunkType  => async (dispatch) => {
  let response = await authAPI.authMe()
  if (response.data.resultCode === 0) {
    let { email, id, login } = response.data.data;
    dispatch(setAuthUserData(email, id, login, true))
  }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => 
  async (dispatch) => {
  let response = await authAPI.authLogin(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
    dispatch(setCaptchaUrl(null))
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl())
    }
    let messages = response.data.messages.length > 0
      ? response.data.messages
      : 'Some error'
    dispatch(stopSubmit('login', { _error: messages }))
  }
}
export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.authLogout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl()
  const urlCaptcha = response.data.url
  dispatch(setCaptchaUrl(urlCaptcha))
}
export type initialStateType = typeof initialState
export default authReducer