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

type FormInputs = {
    fullName: string;
    isLookingForAJob: boolean;
    mySkills: string;
    aboutMe: string
};

export const ProfileDataForm = ({profile, onSubmit}: ProfileDataFormType) => {
    //
    // const schema = yup.object().shape({
    //     input: yup.string(),
    // })

    const {
        handleSubmit,
        formState: {errors, isSubmitSuccessful},
        register
    } = useForm<FormInputs>({
        defaultValues: {
            fullName: "Full Name",
            mySkills: "My professional skills",
            aboutMe: "About me"
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
                    <input type={"checkbox"} {...register("isLookingForAJob")} />
                </div>
                <div>
                    <label>My professional skills</label>
                    <textarea {...register("mySkills")} />
                </div>
                <div>
                    <label>About me</label>
                    <textarea {...register("aboutMe")} />
                </div>
                <div className={s.contacts}>
                    <b>Contacts</b>: {profile?.contacts && Object.entries(profile?.contacts).map(value => {
                    return value[0] && <Contact key={value[0]} contactTitle={value[0]}
                                                contactValue={value[1]}/>
                })}
                </div>
            </form>
        </div>
    )
}
