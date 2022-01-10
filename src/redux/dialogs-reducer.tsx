import {v1} from "uuid";
import {ActionsTypes, dialogsPageType, messageObjectType} from "./state";

export const dialogsReducer = (state: dialogsPageType, action: ActionsTypes) => {

    switch (action.type) {
        case "ADD-NEW-MESSAGE":
            const newMessage: messageObjectType = {
                id: v1(),
                isYou: true,
                message: state.newMessage,
                img: 'https://www.nicepng.com/png/detail/914-9142519_doge-meme-dog-doggo-funny-sticker-momo-png.png'
            }
            state.messages.push(newMessage)
            state.textForMessageInDialog = '';
            return state;
        case "UPDATE-NEW-MESSAGE-TEXT":
            state.textForMessageInDialog = state.newText
            return state;
        default:
            return state
    }
}