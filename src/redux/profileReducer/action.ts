import {ProfileType} from "./types";

export const addPostAC = (messageForNewPost: string) => {
    return {
        type: "ADD-POST",
        textForNewPost: messageForNewPost
    } as const
}

export const updateNewPostTextAC = (newText: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    } as const
}
export const setUserProfileAC = (profile: ProfileType | null) => {
    return {
        type: "SET-USER-PROFILE",
        profile,
    } as const
}
