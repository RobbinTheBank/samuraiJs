import { AppStateType } from "../redux-store";

export const getProfile = (state: AppStateType)=>{
    return state.profilePage.profile
}
export const getStatusProifle = (state: AppStateType)=>{
    return state.profilePage.status
}
export const getAutorizedUserId = (state: AppStateType)=>{
    return state.authPage.userId
}