import { createSelector } from "reselect"
import { AppStateType } from "./redux-store"

const getUsersPageSelector =(state: AppStateType)=>{
    return state.usersPage.users
}
export const getUsersPage = createSelector(getUsersPageSelector, (users)=>{
    return users.filter(u=> true)
})
export const getCurrentPage =(state: AppStateType)=>{
    return state.usersPage.currentPage
}
export const getPageSize =(state: AppStateType)=>{
    return state.usersPage.pageSize
}
export const getTotalUsersCount =(state: AppStateType)=>{
    return state.usersPage.totalUsersCount
}
export const getIsFething =(state: AppStateType)=>{
    return state.usersPage.isFetching
}
export const getFollowingInProgress =(state: AppStateType)=>{
    return state.usersPage.followingInProgress
}
export const getIsAuth =(state: AppStateType)=>{
    return state.authPage.isAuth
}
export const getDialogsMessages = (state: AppStateType)=>{
    return state.dialogsPage.messages
}
export const getDialogsData = (state: AppStateType) =>{
    return state.dialogsPage.dialogs
}
export const selectCurrentUseLogin = (state: AppStateType)=>{
    return state.authPage.login
}
export const getFilterForm = (state: AppStateType)=>{
    return state.usersPage.filter
}