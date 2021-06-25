import { profileAPI } from "../api/api"

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
    posts: [
        { id: 1, message: 'message 1', likesCount: 15 },
        { id: 2, message: 'message 2', likesCount: 5 },
    ],
    newPostText: '',
    profile: null,
    status: ''
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let body = action.newPostText
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: body, likesCount: 0 }],
                newPostText: '',
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST: 
        return {
            ...state,
            posts: state.posts.filter(p=> p.id != action.postId )
        }
        default: return state
    }
}
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText })
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile})
const setStatus = (status) => ({ type: SET_STATUS, status})
export const deletePost =(postId)=>({type: DELETE_POST, postId})

export const getUserProfile = (userId) => async (dispatch) =>{
    let response  = await profileAPI.getProfile(userId)
            dispatch(setUserProfile(response.data))
}
export const getStatus = (userId) => async(dispatch) =>{
    let response = await profileAPI.getStatus(userId)
            dispatch(setStatus(response.data))
}
export const updateStatus = (status) => async (dispatch) =>{
    let response = await profileAPI.updateStatus(status)
            if(response.data.resultCode === 0){
                dispatch(setStatus(status))
            }
}
export default profileReducer