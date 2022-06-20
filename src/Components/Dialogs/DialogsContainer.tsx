import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../bll/redux-store";
import React from "react";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {
    addNewMessageAC, DialogType, MessageType
} from "../../bll/dialogReducer";

type MapStatePropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    isAuth: boolean
}
type MapDispatchPropsType = {
    addNewMessageAC: (textForMessageInDialog: string) => void
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {addNewMessageAC}),
    withAuthRedirect,
)(Dialogs)