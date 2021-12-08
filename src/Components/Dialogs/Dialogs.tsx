import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props: any) => {
    let path = `${'/dialogs/'} ${props.id}`
    return (
        <div className={`${s.dialog} + ${s.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )

    const Message = (props: any) => {
        return (
            <div className={s.message}>
                {props.message}
            </div>
        )
    }

    const Dialogs = (props: any) => {
        return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    <DialogItem name={'Sergey'} id={'1'}/>
                    <DialogItem name={'Maria'} id={'2'}/>
                    <DialogItem name={'Mark'} id={'3'}/>
                    <DialogItem name={'Alexandr'} id={'4'}/>
                    <DialogItem name={'Mike'} id={'5'}/>
                    <DialogItem name={'John'} id={'6'}/>
                </div>

                <div className={s.messages}>
                    <Message message='Hello!'/>
                    <Message message="Hi, my name's Ivan, I have a proposal for you!"/>
                    <Message message="Yea? What's up with a proposal?!"/>
                </div>
            </div>
        )
    }

    export default Dialogs