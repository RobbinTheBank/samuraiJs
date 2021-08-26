import { stopSubmit } from "redux-form"
import { profileAPI } from "../api/api"
import { PhotosType, PostType, ProfileType } from "./types/types"

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SUCCESS_PHOTOS = 'SUCCESS_PHOTOS'

let initialState = {
    posts: [
        { id: 1, message: 'message 1', likesCount: 15 },
        { id: 2, message: 'message 2', likesCount: 5 },
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: ''
} 
const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SUCCESS_PHOTOS:
            return {
                ...state, 
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default: return state
    }
}
export const addPost = (newPostText: string): AddPostActionType => ({ type: ADD_POST, newPostText })
type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
const successPhotos = (photos: PhotosType): SuccessPhotosActionType => ({ type: SUCCESS_PHOTOS, photos })
type SuccessPhotosActionType = {
    type: typeof SUCCESS_PHOTOS
    photos: PhotosType
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const setPhotos = (photos: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhotos(photos)
    if(response.data.resultCode === 0){
        dispatch(successPhotos(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    let userId = getState().authPage.userId
    let response = await profileAPI.saveProfile(profile)
     if(response.data.resultCode === 0){
         console.log(profile)
      dispatch(getUserProfile(userId))
     }
     else{
        dispatch(stopSubmit('edite-profile', {'contacts':{'facebook': response.data.messages[0]} }))
        return Promise.reject(response.data.messages[0])
     }
  }
export type InitialStateType = typeof initialState
export default profileReducer