import {v1} from "uuid";
import {ActionsTypes, profilePageType} from "./old-store";

const initialState = {
    posts: [
        {id: '1', message: "Hello, my name's Ivan", likesCount: 5},
        {id: '2', message: "I'm fine, thanks", likesCount: 22},
        {id: '3', message: "I'm not fine", likesCount: 202},
    ],
    messageForNewPost: ''
}

export const profileReducer = (state: profilePageType = initialState, action: ActionsTypes): profilePageType => {

    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                message: action.messageForNewPost,
                likesCount: 0,
            }
            const stateCopy = {...state};
            stateCopy.posts = {...state.posts};
            stateCopy.posts.push(newPost);
            stateCopy.messageForNewPost = '';
            return stateCopy;
        }
        case 'UPDATE-NEW-POST-TEXT': {
            const stateCopy = {...state};
            stateCopy.messageForNewPost = action.newText;
            return stateCopy;
        }
        default:
            return state
    }
}


export const addPostAC = (messageForNewPost: string) => {
    return {
        type: "ADD-POST",
        messageForNewPost: messageForNewPost
    } as const
}

export const updateNewPostTextAC = (newText: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    } as const
}