import {ProfileType} from "../../../bll/profileReducer";
import s from "./ProfileInfo.module.css";
import Button from "@mui/material/Button";
import React from "react";
import {Contact} from "./ProfileInfo";

type ProfileDataType = {
    profile: ProfileType | null
    isOwner?: boolean
    goToEditMode?: () => void
}

export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {

    return (
        <div className={s.profileInfo}>
            {isOwner &&
            <div><Button onClick={goToEditMode} variant='contained'>Edit</Button></div>}
            <div>
                <b>Full name</b>: {profile?.fullName}
            </div>
            <div>
                <b>Looking for a job</b> : {profile?.lookingForAJob ? "yes" : "no"}
            </div>
            <div>
                <b>My professional skills</b>: {profile?.lookingForAJobDescription}
            </div>
            <div>
                <b>About me</b>: {profile?.aboutMe}
            </div>
            <div className={s.contacts}>
                <b>Contacts</b>: {profile?.contacts && Object.entries(profile?.contacts).map(value => {
                return value[0] && <Contact key={value[0]} contactTitle={value[0]}
                                            contactValue={value[1]}/>
            })}
            </div>
        </div>
    )
}
