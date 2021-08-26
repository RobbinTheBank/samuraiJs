import  axios from 'axios'
import { ProfileType } from '../redux/types/types'

export enum ResultCodeEnum {
    Success = 0,
    Error = 1

}
export enum ResultCaptchaEnum {
    CaptchaIsRequired = 10
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "12274969-0a1c-409d-baa0-9d960507d8a7"
        
    }
})
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId: number){
        return instance.post('follow/' + userId)
    },
    unfollow(userId: number){
        return instance.delete('follow/' + userId)
    }
}
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
export const authAPI = {
    async authMe(){
        const resp = await instance.get<MeResponseType>(`auth/me`)
        return resp.data
    },
    authLogin(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null){
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    authLogout(){
        return instance.delete(`auth/login`)
    }
} 
type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum | ResultCaptchaEnum
    messages: string
}
export const securityAPI = {
    getCaptchaUrl(){
        return instance.get('security/get-captcha-url')
    }
}
