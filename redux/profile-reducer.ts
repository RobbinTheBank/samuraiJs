
import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { profileAPI } from "../api/api"
import { AppStateType, InferActionsType } from "./redux-store"
import { PhotosType, PostType, ProfileType } from "./types/types"

const actions = {
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
    newPostText: '',
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
                newPostText: '',
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
export const getUserProfile = (userId: number): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response.data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const setPhotos = (photos: any): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.savePhotos(photos)
    if(response.data.resultCode === 0){
        dispatch(actions.successPhotos(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
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
export default profileReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsType<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>