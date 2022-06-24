import React from 'react';
import s from './Message.module.css'

type MessagePropsType = { message: string; img: string; isYou: boolean }

export const Message = (props: MessagePropsType) => {
    return (
        <div className={props.isYou ? s.youStyle : s.theyStyle}>
            <img alt="" src={props.img}/>
            <p className={s.textMessage}>{props.message}</p>
        </div>
    )
}
