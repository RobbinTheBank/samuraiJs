export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PostType = {
    id: number | null
    message: string
    likesCount: number
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type SavePhotoResponse = {
    photos: PhotosType
}
export type ProfileType = {
    userId: number 
    lookingForAJob: boolean
    fullName: string
    contacts: ContactsType
    photos: PhotosType 
    aboutMe: string
    lookingForAJobDescription: string
    
}
export type UserType = {
    id: number 
    name: string 
    status: string 
    photos: PhotosType 
    followed: boolean
}
export type LogUser = {
    email: string
     password: string
      rememberMe: boolean
       captcha: string
}