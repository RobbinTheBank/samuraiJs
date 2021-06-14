import { profileAPI } from "../api/api"

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

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
        default: return state
    }
}
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText })
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile})
const setStatus = (status) => ({ type: SET_STATUS, status})

export const getUserProfile = (userId) => (dispatch) =>{
    profileAPI.getProfile(userId)
        .then(response=>{
            dispatch(setUserProfile(response.data))
        })
}
export const getStatus = (userId) => (dispatch) =>{
    profileAPI.getStatus(userId)
        .then(response=>{
            dispatch(setStatus(response.data))
        })
}
export const updateStatus = (status) => (dispatch) =>{
    profileAPI.updateStatus(status)
        .then(response=>{
            if(response.data.resultCode === 0){
                dispatch(setStatus(status))
            }
        })
}
export default profileReducer