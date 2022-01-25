import React from 'react';
import {addNewMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: (actions: ) => void) => {
    return {
        addNewMessage: (textForMessageInDialog: string) => dispatch(addNewMessageAC(textForMessageInDialog)),
        updateNewMessageText: (text: string) => dispatch(updateNewMessageTextAC(text)),
    }
}
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);