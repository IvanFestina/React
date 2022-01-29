
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