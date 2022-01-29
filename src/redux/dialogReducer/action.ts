
export const addNewMessageAC = (newMessage: string) => {
    return {
        type: "ADD-NEW-MESSAGE",
        newMessage: newMessage
    } as const
}
export const updateNewMessageTextAC = (newText: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newText: newText
    } as const
}
