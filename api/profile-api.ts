import { ProfileType, SavePhotoResponse } from "../redux/types/types"
import { APIResponseData, instance } from "./api"

export const profileAPI = {
    getProfile(userId: number){
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number){
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string){
        return instance.put<APIResponseData>(`profile/status`, {status: status})
    },
    savePhotos(photos: any){
        const data = new FormData()
        data.append('image', photos)
        return instance.put<APIResponseData<SavePhotoResponse>>(`profile/photo`, data, {
            headers:{
            'Content-Type': `multipart/form-data`}
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType){
        return instance.put<APIResponseData>('profile/', profile).then(res => res.data)
    }
}