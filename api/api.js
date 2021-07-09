import  axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "12274969-0a1c-409d-baa0-9d960507d8a7"
        
    }
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId){
        return instance.post('follow/' + userId)
    },
    unfollow(userId){
        return instance.delete('follow/' + userId)
    }
}
export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/` + userId)
    },
    getStatus(userId){
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status: status})
    },
    savePhotos(photos){
        const data = new FormData()
        data.append('image', photos)
        return instance.put(`profile/photo`, data, {
            headers:{
            'Content-Type': `multipart/form-data`}
        })
    },
    saveProfile(profile){
        return instance.put('profile/', profile)
    }
}
export const authAPI = {
    authMe(){
        return instance.get(`auth/me`)
    },
    authLogin(email, password, rememberMe = false, captcha){
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    authLogout(){
        return instance.delete(`auth/login`)
    }
} 
