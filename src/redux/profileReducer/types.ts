import {addPostAC, setUserProfile, updateNewPostTextAC} from "./action";
import {setToggleFollowingProgressAC} from "../usersReducer/action";

export type postsObjectType = {
    id: string;
    message: string
    likesCount: number
}
export type profilePageType = {
    posts: Array<postsObjectType>
    textForNewPost: string,
    profile: ProfileType | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsPropsType
    photos: PhotosType
}
export type ContactsPropsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string
    large: string
}


export type ProfileActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setToggleFollowingProgressAC>