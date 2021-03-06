import { GetItems, instance, APIResponseData } from "./api"

export const usersAPI = {
    async getUsers(currentPage: number = 1, pageSize: number = 10, term: string, friend: null | boolean = null){
        const res = await instance.get<GetItems>
            (`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
        return res.data
    },
    follow(userId: number){
        return instance.post('follow/' + userId).then(res => res.data) as Promise<APIResponseData>
        
    },
    unfollow(userId: number){
        return instance.delete ('follow/' + userId).then(res => res.data) as Promise<APIResponseData>
         
    }
}