import { usersAPI } from "../api/api"

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
const usersReducer = (state = initialState, action)=>{
    switch(action.type){
        case FOLLOW: 
            return {
                ...state,
                users: state.users.map(u=>{
                    if(u.id === action.userId){
                        return{
                            ...u, followed: true
                        }
                    }
                    return u
                })
            }
        case UNFOLLOW: 
            return {
                ...state,
                users: state.users.map(u=>{
                    if(u.id === action.userId){
                        return{
                            ...u, followed: false
                        }
                    }
                    return u
                })
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
                    : state.followingInProgress.filter(id=> id != action.userId)
            }
        default: return state
    }
}
const followUser = (userId)=>({type: FOLLOW, userId})
const unfollowUser = (userId)=>({type: UNFOLLOW, userId})
const toggleFollowingInProgress = (isFething, userId)=>({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFething, userId})
export const setTotalUsersCount = (count)=>({type: SET_TOTAL_USERS_COUNT, count})
const setUser = (users)=>({type: SET_USERS, users})
export const pageChanged = (page)=>({type: PAGE_CHANGED, page})
export const setIsFetching = (isFething)=>({type: SET_IS_FETCHING, isFething})


export const getUsers = (currentPage, pageSize) =>(dispatch)=>{
    dispatch(setIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize)
    .then(response=>{
        dispatch(setIsFetching(false))
        dispatch(setUser(response.data.items))
        dispatch(setTotalUsersCount(response.data.totalCount))
    })
}

export const follow = (userId) =>(dispatch)=>{
    dispatch(toggleFollowingInProgress(true, userId))
    usersAPI.follow(userId)
    .then(response=>{
        if(response.resultCode === 0){
            dispatch(followUser(userId))
        }
        dispatch(toggleFollowingInProgress(false, userId))
    })
}
export const unfollow = (userId) =>(dispatch)=>{
    dispatch(toggleFollowingInProgress(true, userId))
    usersAPI.unfollow(userId)
    .then(response=>{
        if(response.resultCode === 0){
            dispatch(unfollowUser(userId))
        }
        dispatch(toggleFollowingInProgress(false, userId))
    })
}

export default usersReducer