import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {addNewMessageAC, InitialStateDialogsType} from "../../redux/dialogReducer/dialogReducer";
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";

type DialogsPropsType = {
    dialogsPage: InitialStateDialogsType
    isAuth: boolean
    addNewMessage: (textForMessageInDialog: string) => void
    updateNewMessageText: (text: string) => void
}

export const Dialogs = ({addNewMessage, ...props}: DialogsPropsType) => {
    let dialogElements = props.dialogsPage.dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messageElements = props.dialogsPage.messages.map(m => <Message message={m.message} img={m.img} isYou={m.isYou}
                                                                       key={m.id}/>)


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
                    <AddMessageForm addNewMessage={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}

// NEW COMPONENT
type AddPostFormPropsType = {
    addNewMessage: (textForMessageInDialog: string) => void
}
type IFormInputs = {
    'message_area': string
}

export const AddMessageForm = ({addNewMessage, ...props}: AddPostFormPropsType) => {
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        message_area: yup.string().required("Required"),
    })

    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<IFormInputs>({resolver: yupResolver(schema)})

    const formSubmitHandler: SubmitHandler<any> = (data: IFormInputs) => {
        dispatch(addNewMessageAC(data.message_area))
    }

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <FormGroup>
                <Controller name={'message_area'} control={control}
                            render={({field}) => (
                                <TextField {...field} label="Type your message here"
                                           type='text'
                                           margin="normal"
                                />
                            )}/>
                <Button type='submit' variant={"contained"}>Send</Button>
            </FormGroup>
        </form>
    )
}