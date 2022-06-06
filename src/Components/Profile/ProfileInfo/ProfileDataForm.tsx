import s from './ProfileDataForm.module.css'
import React from "react";
import {Contact} from "./ProfileInfo";
import {ProfileType} from "../../../redux/profileReducer";
import {useForm} from "react-hook-form";
import Button from "@material-ui/core/Button";


type ProfileDataFormType = {
    profile: ProfileType | null
    isOwner?: boolean
    goToEditMode?: () => void
    onSubmit: (formData: any) => void
}

export type FormInputs = {
    fullName: string | null;
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    aboutMe: string
};

export const ProfileDataForm = ({profile, onSubmit}: ProfileDataFormType) => {
    //
    // const schema = yup.object().shape({
    //     input: yup.string(),
    // })

    const {
        handleSubmit,
        register,
        control
    } = useForm<FormInputs>({
        defaultValues: {
            fullName: profile?.fullName,
            lookingForAJob: profile?.lookingForAJob,
            lookingForAJobDescription: profile?.lookingForAJobDescription,
            aboutMe: profile?.aboutMe
        }
    })


    return (
        <div className={s.profileDataForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div><Button variant='contained' type='submit'>Save</Button></div>
                <div>
                    <label>Full Name</label>
                    <input {...register("fullName")} />
                </div>
                <div>
                    <label>Looking for a job</label>
                    <input type={"checkbox"} {...register("lookingForAJob")} />
                </div>
                <div>
                    <label>My professional skills</label>
                    <textarea {...register("lookingForAJobDescription")} />
                </div>
                <div>
                    <label>About me</label>
                    <textarea {...register("aboutMe")} />
                </div>
                <div className={s.contacts}>
                    <label>Contacts</label>: {profile?.contacts && Object.entries(profile?.contacts).map(value => {
                    return value[0] && <Contact key={value[0]} contactTitle={value[0]}
                                                contactValue={value[1]}/>
                })}
                </div>
            </form>
        </div>
    )
}
