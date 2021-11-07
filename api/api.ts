import  axios from 'axios'
import { ProfileType, UserType } from '../redux/types/types'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "12274969-0a1c-409d-baa0-9d960507d8a7"
        
    }
})
export const profileAPI = {
    getProfile(userId: number){
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number){
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string){
        return instance.put(`profile/status`, {status: status})
    },
    savePhotos(photos: any){
        const data = new FormData()
        data.append('image', photos)
        return instance.put(`profile/photo`, data, {
            headers:{
            'Content-Type': `multipart/form-data`}
        })
    },
    saveProfile(profile: ProfileType){
        return instance.put('profile/', profile)
    }
}
export const securityAPI = {
        getCaptchaUrl(){
            return instance.get('security/get-captcha-url')
        }
}

export type GetItems = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseData<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: string
    resultCode: RC
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCaptchaEnum {
    CaptchaIsRequired = 10
}
