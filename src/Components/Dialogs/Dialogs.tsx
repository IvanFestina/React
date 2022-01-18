import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
    dialogObjectType,
    messageObjectType
} from "../../redux/old-store";
type DialogsPropsType = {
    dialogs: Array<dialogObjectType>
    messages: Array<messageObjectType>
    textForMessageInDialog: string
    addNewMessage: (textForMessageInDialog: string) => void
    updateNewMessageText: (text: string) => void
}

export const Dialogs = (props: DialogsPropsType) => {
    let dialogElements = props.dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messageElements = props.messages.map(m => <Message message={m.message} img={m.img} isYou={m.isYou} key={m.id}/>)

    const onClickButtonHandler = () => {
    props.addNewMessage(props.textForMessageInDialog)
    }
    const onChangeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.updateNewMessageText(e.currentTarget.value)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.dialogsContent}>
                <div className={s.messages}>
                    {messageElements}
                </div>
                <div className={s.typeAndSend}>
                    <div>
                        <textarea onChange={onChangeTextAreaHandler} value={props.textForMessageInDialog} placeholder={'Enter your message'}> </textarea>
                    </div>
                    <div>
                        <button onClick={onClickButtonHandler}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
