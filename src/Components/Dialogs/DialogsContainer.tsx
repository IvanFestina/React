import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
     StoreType
} from "../../redux/store";
import {addNewMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";

type DialogsPropsType = {
    store: StoreType
}

export const DialogsContainer = ({store, ...props}: DialogsPropsType) => {
    const state = store.getState()

    const onClickButtonHandler = () => {
        store.dispatch(addNewMessageAC(state.dialogsPage.textForMessageInDialog))
    }
    const onChangeTextAreaHandler = (text: string) => {
        store.dispatch(updateNewMessageTextAC(text))
    }


    return <Dialogs dialogs={state.dialogsPage.dialogs}
                    messages={state.dialogsPage.messages}
                    textForMessageInDialog={state.dialogsPage.textForMessageInDialog}
                    addNewMessage={onClickButtonHandler}
                    updateNewMessageText={onChangeTextAreaHandler}/>
}

const f1 = () => {
    return {

    }
}
const f2 = () => {
    return {

    }
}


const SuperDialogsContainer = connect(f1, f2)(Dialogs);