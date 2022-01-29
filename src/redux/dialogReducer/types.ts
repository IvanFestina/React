import {addNewMessageAC, updateNewMessageTextAC} from "./action";

export type dialogObjectType = {
    id: string;
    name: string
}
export type messageObjectType = {
    id: string;
    message: string
    img: string
    isYou: boolean
}

export type InitialStateDialogsType = {
    messages: messageObjectType[]
    dialogs: dialogObjectType[]
    textForMessageInDialog: string
}

export type ActionsDialogTypes = ReturnType<typeof addNewMessageAC>
| ReturnType<typeof updateNewMessageTextAC>

