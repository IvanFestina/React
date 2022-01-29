import {addPostAC, updateNewPostTextAC} from "./action";

export type postsObjectType = {
    id: string;
    message: string
    likesCount: number
}
export type profilePageType = {
    posts: Array<postsObjectType>
    textForNewPost: string
}

export type ProfileActionsTypes =  ReturnType<typeof addPostAC> | ReturnType<typeof updateNewPostTextAC>
