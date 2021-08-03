import { usersAPI } from "../api/api"
import { updateObjectsInArray } from "../utils/updateObjectsInArray"
import { UserType } from "./types/types"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const PAGE_CHANGED = 'ON_PAGE_CHANGED'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 20,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [] as Array<number>,
}
const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectsInArray(state.users,  action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectsInArray(state.users,  action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
                // users: [...state.users, ...action.users]
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case PAGE_CHANGED:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default: return state
    }
}
const followUser = (userId: number): followUsersActionType => ({ type: FOLLOW, userId })
type followUsersActionType = {
    type: typeof FOLLOW
    userId: number
}
const unfollowUser = (userId: number): unfollowUserActionType => ({ type: UNFOLLOW, userId })
type unfollowUserActionType = {
    type: typeof UNFOLLOW
    userId: number 
}
const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressActionType => (
    { type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId }
)
type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count })
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
const setUser = (users: UserType): SetUserActionType => ({ type: SET_USERS, users })
type SetUserActionType = {
    type: typeof SET_USERS
    users: UserType 
}
export const pageChanged = (page: number): PageChangedActionType => ({ type: PAGE_CHANGED, page })
type PageChangedActionType = {
    type: typeof PAGE_CHANGED
    page: number
}
export const setIsFetching = (isFetching: boolean): setIsFetchingActionType => ({ type: SET_IS_FETCHING, isFetching })
type setIsFetchingActionType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true))
    let response = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(pageChanged(currentPage))
            dispatch(setIsFetching(false))
            dispatch(setUser(response.data.items))
            dispatch(setTotalUsersCount(response.data.totalCount))
}
const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any )=> {
    dispatch(toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
            if (response.data.resultCode === 0) {
                dispatch(actionCreator(userId))
            }
            dispatch(toggleFollowingInProgress(false, userId))
}
export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followUser)
}
export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowUser)  
}
export type InitialStateType = typeof initialState
export default usersReducer