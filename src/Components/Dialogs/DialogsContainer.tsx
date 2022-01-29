import {addNewMessageAC, updateNewMessageTextAC} from '../../redux/dialogReducer/action'
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {InitialStateDialogsType} from "../../redux/dialogReducer/types";

type MapStatePropsType = {
    dialogsPage: InitialStateDialogsType
}
type MapDispatchPropsType = {
    addNewMessage: (textForMessageInDialog: string) => void
    updateNewMessageText: (text: string) => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
    return {
        addNewMessage: (textForMessageInDialog: string) => dispatch(addNewMessageAC(textForMessageInDialog)),
        updateNewMessageText: (text: string) => dispatch(updateNewMessageTextAC(text)),
    }
}
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);