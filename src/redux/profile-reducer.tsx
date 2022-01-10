import {v1} from "uuid";
import {ActionsTypes, profilePageType} from "./state";

export const profileReducer = (state: profilePageType, action: ActionsTypes) => {

    switch (action.type) {
        case 'ADD-POST':
            const newPost = {
                id: v1(),
                message: state.messageForNewPost,
                likesCount: 0,
            }
            state.posts.push(newPost);
            state.messageForNewPost = '';
            return state;
        case 'UPDATE-NEW-POST-TEXT':
            state.messageForNewPost = action.newText;
            return state;
        default:
            return state
    }
}