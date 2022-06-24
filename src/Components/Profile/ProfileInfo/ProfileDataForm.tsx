import s from './ProfileDataForm.module.css'
import React from "react";
import {
    ContactsPropsType,
    ProfileType,
    saveProfileTC
} from "../../../bll/profileReducer";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Button from "@material-ui/core/Button";
import Input from "@mui/material/Input";
import {Checkbox, TextField} from "@mui/material";
import {useDispatch} from "react-redux";


type ProfileDataFormType = {
    profile: ProfileType | null
    isOwner?: boolean
    goToEditMode?: () => void
    setEditMode: (editMode: boolean) => void
}

export type FormInputs = {
    fullName: string | null;
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    aboutMe: string
};

export const ProfileDataForm = ({profile, setEditMode}: ProfileDataFormType) => {


    const {
        handleSubmit,
        control
    } = useForm <FormInputs & any>(
        {
            defaultValues: {
                fullName: profile?.fullName,
                lookingForAJob: profile?.lookingForAJob,
                lookingForAJobDescription: profile?.lookingForAJobDescription,
                aboutMe: profile?.aboutMe
            }
        }
    )

    const dispatch = useDispatch()
    const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
        console.log('submit')
        setEditMode(false)
        await dispatch(saveProfileTC(data))
    }

    return (
        <div className={s.profileDataForm}>
            <div>
                <div className={s.button}><Button variant='contained'
                             onClick={handleSubmit(onSubmit)}>Save</Button></div>
                <div>
                    <label>Full Name</label>
                    <Controller name="fullName" control={control}
                                render={({field}) => <Input {...field} />}/>
                </div>
                <div>
                    <label>Looking for a job</label>
                    <Controller name="lookingForAJob" control={control}
                                render={({field}) => <Checkbox {...field} />}/>
                </div>
                <div>
                    <label>My professional skills</label>
                    <Controller name="lookingForAJobDescription" control={control}
                                render={({field}) => <TextField {...field} />}/>
                </div>
                <div>
                    <label>About me</label>
                    <Controller name="aboutMe" control={control}
                                render={({field}) => <TextField {...field} />}/>
                </div>
                <div className={s.contacts}>
                    <label>Contacts</label>: {profile?.contacts && Object.keys(profile?.contacts).map(key => {
                    return <div className={s.contacts}>
                        <b>{key} : <Controller name={key} control={control}
                                                    render={({field}) =>
                                                        <Input {...field} />}/></b>
                    </div>
                })}
                </div>
            </div>
        </div>
    )
}
