import React, {ChangeEvent, useEffect} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogType,  MessageType} from "../../bll/dialogReducer";
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type PropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    isAuth: boolean
    addNewMessageAC: (textForMessageInDialog: string) => void
}

export const Dialogs = ({addNewMessageAC, dialogs,messages, ...props}: PropsType) => {
    let dialogElements = dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messageElements = messages.map(m => <Message message={m.message} img={m.img} isYou={m.isYou}
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
                    <AddMessageForm addNewMessageAC={addNewMessageAC}/>
                </div>
            </div>
        </div>
    )
}

// NEW COMPONENT
type AddPostFormPropsType = {
    addNewMessageAC: (textForMessageInDialog: string) => void
}
type IFormInputs = {
    'message_area': string
}

export const AddMessageForm = ({addNewMessageAC, ...props}: AddPostFormPropsType) => {

    const schema = yup.object().shape({
        message_area: yup.string().required("Required"),
    })

    const {
        handleSubmit,
        control,
        formState: {errors, isSubmitSuccessful},
        reset
    } = useForm<IFormInputs>({resolver: yupResolver(schema)})

    useEffect(() => {
        reset({message_area: ''})
    }, [isSubmitSuccessful, reset])

    const formSubmitHandler: SubmitHandler<any> = (data: IFormInputs) => {
        addNewMessageAC(data.message_area)
    }

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <FormGroup>
                <Controller name={'message_area'} control={control}
                            render={({field}) => (
                                <TextField {...field} label="Type your message here"
                                           type='text'
                                           margin="normal"
                                           error={!!errors.message_area}
                                           defaultValue=""
                                />
                            )}/>
                <Button type='submit' variant={"contained"}>Send</Button>
            </FormGroup>
        </form>
    )
}
