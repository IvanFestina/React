import {ProfileActionsTypes, profilePageType} from './types';
import {v1} from "uuid";
import {setUserProfileAC} from "./action";
import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";

const initialState = {
    posts: [
        {id: '1', message: "Hello, my name's Ivan", likesCount: 5},
        {id: '2', message: "I'm fine, thanks", likesCount: 22},
        {id: '3', message: "I'm not fine", likesCount: 202},
    ],
    textForNewPost: '',
    profile: null,
}

export const profileReducer = (state: profilePageType = initialState, action: ProfileActionsTypes): profilePageType => {
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

export const getUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
//описываем тип, который возвращается из userId - PathParamsType
    return usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data))
        })
}