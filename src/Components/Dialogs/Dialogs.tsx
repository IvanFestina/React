import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {dialogObjectType, messageObjectType} from "../../redux/state";

type DialogsPropsType = {
    dialogs: Array<dialogObjectType>
    message: Array<messageObjectType>
    textForMessageInDialog: string
}

export const Dialogs = (props: DialogsPropsType) => {
    let dialogElements = props.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)
    let messageElements = props.message.map(m => <Message message={m.message} img={m.img} isYou={m.isYou}/>)

    const onClickButtonHandler = () => {

    }
    const onChangeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {

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
                        <textarea onChange={onChangeTextAreaHandler} value={props.textForMessageInDialog}> </textarea>
                    </div>
                    <div>
                        <button onClick={onClickButtonHandler}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
