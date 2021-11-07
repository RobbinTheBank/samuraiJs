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
    userId: number | null
    lookingForAJob: boolean
    fullName: string
    contacts: ContactsType
    photos: PhotosType 
}
export type UserType = {
    id: number | null
    name: string | null
    status: string | null
    photos: PhotosType | null
    followed: boolean | null
}