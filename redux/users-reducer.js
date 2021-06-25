import { usersAPI } from "../api/api"
import { updateObjectsInArray } from "../utils/updateObjectsInArray"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const PAGE_CHANGED = 'ON_PAGE_CHANGED'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 0,
    isFething: false,
    followingInProgress: [],
}
const usersReducer = (state = initialState, action) => {
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
                isFething: action.isFething
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFething
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default: return state
    }
}
const followUser = (userId) => ({ type: FOLLOW, userId })
const unfollowUser = (userId) => ({ type: UNFOLLOW, userId })
const toggleFollowingInProgress = (isFething, userId) => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isFething, userId })
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count })
const setUser = (users) => ({ type: SET_USERS, users })
export const pageChanged = (page) => ({ type: PAGE_CHANGED, page })
export const setIsFetching = (isFething) => ({ type: SET_IS_FETCHING, isFething })

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true))
    let response = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(setIsFetching(false))
            dispatch(setUser(response.data.items))
            dispatch(setTotalUsersCount(response.data.totalCount))
}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator )=> {
    dispatch(toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
            if (response.data.resultCode == 0) {
                dispatch(actionCreator(userId))
            }
            dispatch(toggleFollowingInProgress(false, userId))
}
export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followUser)
}
export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowUser)  
}

export default usersReducer