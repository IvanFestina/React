import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import React from "react";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {
    addNewMessageAC,
    InitialStateDialogsType,
    updateNewMessageTextAC
} from "../../redux/dialogReducer/dialogReducer";

type MapStatePropsType = {
    dialogsPage: InitialStateDialogsType
    isAuth: boolean
}
type MapDispatchPropsType = {
    addNewMessage: (textForMessageInDialog: string) => void
    updateNewMessageText: (text: string) => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {addNewMessageAC, updateNewMessageTextAC}),
    withRouter,
    withAuthRedirect,
    )(Dialogs)