import { instance } from "./api"

export const securityAPI = {
    async getCaptchaUrl(){
        let res = await instance.get<string>('security/get-captcha-url')
        return  res.data
    }
}
type GetCaptchaUrlResponseData = {
    url: string
}