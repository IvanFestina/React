import {v1} from "uuid";
import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";
import {setToggleFollowingProgressAC} from "../usersReducer/userReducer";

const initialState = {
    posts: [
        {id: '1', message: "Hello, my name's Ivan", likesCount: 5},
        {id: '2', message: "I'm fine, thanks", likesCount: 22},
        {id: '3', message: "I'm not fine", likesCount: 202},
    ],
    textForNewPost: '',
    profile: null,
}

//REDUCER

export const profileReducer = (state: initialStateProfilePageType = initialState, action: ProfileActionsTypes): initialStateProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                message: action.textForNewPost,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                textForNewPost: ''
            };
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, textForNewPost: action.newText};
        }
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile}
        default:
            return state
    }
}

//ACTIONS

export const addPostAC = (messageForNewPost: string) => ({type: "ADD-POST", textForNewPost: messageForNewPost} as const)
export const updateNewPostTextAC = (newText: string) => ({type: "UPDATE-NEW-POST-TEXT", newText} as const)
export const setUserProfileAC = (profile: ProfileType | null) => ({type: "SET-USER-PROFILE", profile,} as const)

//THUNKS

export const getUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
//описываем тип, который возвращается из userId - PathParamsType
    return usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data))
        })
}

//TYPES


export type postsObjectType = {
    id: string;
    message: string
    likesCount: number
}
export type initialStateProfilePageType = {
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
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setToggleFollowingProgressAC>