import { instance, APIResponseData, ResultCaptchaEnum, ResultCodeEnum } from "./api"

export const authAPI = {
    async authMe(){
        const res = await instance.get<APIResponseData<MeResponseDataType>>(`auth/me`)
        return res.data
    },
    authLogin(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null){
        return instance.post<APIResponseData<loginResponseDataType, ResultCodeEnum | ResultCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    authLogout(){
        return instance.delete(`auth/login`)
    }
}
export type MeResponseDataType = {
        id: number
        email: string
        login: string
}
export type loginResponseDataType = {
    userId: number
}