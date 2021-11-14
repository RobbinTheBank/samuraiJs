import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { ResultCodeEnum } from "../api/api"
import { usersAPI } from "../api/users-api"
import { updateObjectsInArray } from "../utils/updateObjectsInArray"
import { AppStateType, BaseThunkType, GetInferActions } from "./redux-store"
import { UserType } from "./types/types"

export const actions = {
    followUser: (userId: number) => ({ type: 'SA/FOLLOW', userId } as const),
    unfollowUser: (userId: number) => ({ type: 'SA/UNFOLLOW', userId } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: 'SA/TOGGLE_FOLLOWING_IN_PROGRESS', isFetching, userId } as const),
    setUser: (users: Array<UserType>) => ({ type: 'SA/SET_USERS', users } as const),
    setTotalUsersCount: (count: number) => ({ type: 'SA/SET_TOTAL_USERS_COUNT', count } as const),
    pageChanged: (page: number) => ({ type: 'SA/PAGE_CHANGED', page } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'SA/SET_IS_FETCHING', isFetching } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SA/SET_CURRENT_PAGE', currentPage } as const),
}
let initialState = {
    users: [] as Array<UserType>,
    pageNumber: 1,
    pageSize: 20,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    currentPage: 1
}
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SA/FOLLOW':
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId, 'id', { followed: true })
            }
        case 'SA/UNFOLLOW':
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId, 'id', { followed: false })
            }
        case 'SA/SET_USERS':
            return {
                ...state,
                users: action.users
                // users: [...state.users, ...action.users]
            }
        case 'SA/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count
            }
        case 'SA/PAGE_CHANGED':
            return {
                ...state,
                pageNumber: action.page
            }
        case 'SA/SET_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SA/TOGGLE_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'SA/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        default: return state
    }
}
const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes
) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}
export const getUsers = (pageNumber: number, pageSize: number): ThunkType =>
    async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setCurrentPage(pageNumber))
        let data = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(actions.pageChanged(pageNumber))
        dispatch(actions.setIsFetching(false))
        dispatch(actions.setUser(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
export const follow = (userId: number): ThunkType => async (dispatch, getState) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followUser)
}
export const unfollow = (userId: number): ThunkType => async (dispatch, getState) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowUser)
}
export default usersReducer

type InitialStateType = typeof initialState
type ActionsTypes = GetInferActions<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>