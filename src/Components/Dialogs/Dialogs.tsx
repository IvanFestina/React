import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = { name: string; id: string | number }
const DialogItem = (props: DialogItemPropsType) => {
    let path = `${'/dialogs/'} ${props.id}`
    return (
        <div className={`${s.dialog} + ${s.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )}

type MessagePropsType = { message: string }
const Message = (props: MessagePropsType) => {
        return (
            <div className={s.dialog}>
                {props.message}
            </div>
        )
    }

export const Dialogs = (props: any) => {
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
                <div className={s.dialog}>
                    <Message message='Hello!'/>
                    <Message message="Hi, my name's Ivan, I have a proposal for you!"/>
                    <Message message="Yea? What's up with a proposal?!"/>
                </div>
            </div>
        )
    }
