import { FormAction, stopSubmit } from "redux-form"
import { ResultCodeEnum } from "../api/api"
import { profileAPI } from "../api/profile-api"
import { BaseThunkType, GetInferActions } from "./redux-store"
import { PhotosType, PostType, ProfileType } from "./types/types"

export const actions = {
    addPost: (newPostText: string) => ({ type: 'SA/ADD_POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SA/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SA/SET_STATUS', status } as const),
    successPhotos: (photos: PhotosType) => ({ type: 'SA/SUCCESS_PHOTOS', photos } as const),
    deletePost: (postId: number) => ({ type: 'SA/DELETE_POST', postId } as const),
}
let initialState = {
    posts: [
        { id: 1, message: 'message 1', likesCount: 15 },
        { id: 2, message: 'message 2', likesCount: 5 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
} 
const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SA/ADD_POST':
            let body = action.newPostText
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: body, likesCount: 0 }],
            }
        case 'SA/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SA/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SA/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case 'SA/SUCCESS_PHOTOS':
            return {
                ...state, 
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default: return state
    }
}
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}
export const setPhotos = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhotos(file)
    if(data.resultCode === ResultCodeEnum.Success){
        dispatch(actions.successPhotos(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().authPage.userId
    let data = await profileAPI.saveProfile(profile)
     if(data.resultCode === ResultCodeEnum.Success){
         if (userId != null){
            dispatch(getUserProfile(userId))
         } else{
            throw new Error("user id can't be null")
        }
     }
    else{
        dispatch(stopSubmit('edit-profile', {'contacts':{'facebook': data.messages[0]} }))
        return Promise.reject(data.messages[0])
     }
}
export default profileReducer

type InitialStateType = typeof initialState
type ActionsTypes = GetInferActions<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
