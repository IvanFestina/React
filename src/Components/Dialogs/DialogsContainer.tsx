import React from 'react';
import {
    ActionsTypes,
    RootStateType
} from "../../redux/old-store";
import {addNewMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: (actions: ActionsTypes) => void) => {
    return {
        addNewMessage: (textForMessageInDialog: string) => dispatch(addNewMessageAC(textForMessageInDialog)),
        updateNewMessageText: (text: string) => dispatch(updateNewMessageTextAC(text)),
    }
}
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);