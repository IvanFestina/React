import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

type dialogObjectType = {
    id: string;
    name: string
}
type messageObjectType = {
    id: string;
    message: string
    img: string
    isYou: boolean
}
type PropsType = {
    dialogs: Array<dialogObjectType>
    message: Array<messageObjectType>
}

export const Dialogs = (props: PropsType) => {
    let dialogElements = props.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)
    let messageElements = props.message.map(m => <Message message={m.message} img={m.img} isYou={m.isYou}/>)

    let sendRef = React.createRef<HTMLTextAreaElement>()
    const send = () => {
        alert(sendRef.current?.value)
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
                        <textarea ref={sendRef}> </textarea>
                    </div>
                    <div>
                        <button onClick={send}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
