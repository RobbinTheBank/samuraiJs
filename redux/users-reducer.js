const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const PAGE_CHANGED = 'ON_PAGE_CHANGED'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

let initialState = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 0,
    isFething: false
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
        default: return state
    }
}
export const followUser = (userId)=>({type: FOLLOW, userId})
export const unfollowUser = (userId)=>({type: UNFOLLOW, userId})
export const setTotalUsersCount = (count)=>({type: SET_TOTAL_USERS_COUNT, count})
export const setUser = (users)=>({type: SET_USERS, users})
export const pageChanged = (page)=>({type: PAGE_CHANGED, page})
export const setIsFetching = (isFething)=>({type: SET_IS_FETCHING, isFething})

export default usersReducer