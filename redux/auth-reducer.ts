import { authAPI } from "../api/auth-api"
import {ResultCaptchaEnum, ResultCodeEnum } from "../api/api"
import { securityAPI } from "../api/api"
import { FormAction, stopSubmit } from 'redux-form'
import { ThunkAction } from "redux-thunk"
import { AppStateType, BaseThunkType, GetInferActions } from "./redux-store"

let initialState = {
  email: null as (string | null),
  userId: null as number | null,
  login: null as string | null,
  isAuth: false,
  urlCaptcha: null as string | null,
}
const actions = {
  setAuthUserData: (email: string | null, userId: number | null, login: string | null, isAuth: boolean) => 
    ({type: 'SA/SET_USER_DATA', data: { email, userId, login, isAuth } } as const),
  setCaptchaUrl: (urlCaptcha: string | null) => ({ type: 'SA/SET_CAPTCHA_URL', data: {urlCaptcha} } as const)
}
const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case 'SA/SET_USER_DATA':
    case 'SA/SET_CAPTCHA_URL':
      return {
        ...state,
        ...action.data
      }
    default: return state
  }
}
export const getAuthUserData = (): ThunkType  => async (dispatch) => {
  let authMeData = await authAPI.authMe()
  if (authMeData.resultCode === ResultCodeEnum.Success) {
    let { email, id, login } = authMeData.data;
    dispatch(actions.setAuthUserData(email, id, login, true))
  }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => 
  async (dispatch) => {
  let data = await authAPI.authLogin(email, password, rememberMe, captcha)
  if (data.data.resultCode === ResultCodeEnum.Success) {
    dispatch(getAuthUserData())
    dispatch(actions.setCaptchaUrl(null))
  } else {
    if (data.data.resultCode === ResultCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let messages = data.data.messages.length > ResultCodeEnum.Success
      ? data.data.messages
      : 'Some error'
      dispatch(stopSubmit('login', { _error: messages }))
  }
}
export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.authLogout()
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl()
  const urlCaptcha = data.data.url
  dispatch(actions.setCaptchaUrl(urlCaptcha))
}
export default authReducer

export type initialStateType = typeof initialState
type ActionsTypes = GetInferActions<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

