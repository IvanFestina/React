import React, {useRef, useState} from "react";
import s from './ProfileInfo.module.css'
import {ProfileType, savePhotoTC} from "../../../redux/profileReducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import Button from "@mui/material/Button";
import {AttachFile} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {FormInputs, ProfileDataForm} from "./ProfileDataForm";
import {SubmitHandler} from "react-hook-form";
import {ProfileData} from "./PrifleData";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatusTC: (status: string) => void
    savePhotoTC: (file: File) => void
    saveProfileTC: (profile:  Omit<ProfileType, "photos">) => void
}

export const ProfileInfo = ({
                                profile,
                                updateStatusTC,
                                status,
                                isOwner,
                                saveProfileTC
                            }: ProfileInfoPropsType) => {

    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState<boolean>(false);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const onChangeAttachMainPhoto = (target: HTMLInputElement) => {
        if (target.files && target.files.length) {
            dispatch(savePhotoTC(target.files[0]))
        }
    }
    const goToEditMode = () => {
        setEditMode(true)
    }



    // if (!profile) {
    //     return <Preloader/>
    // }

    return (<>
            {profile &&
            <div>
                <div className={s.background}>
                    <img alt="background img"
                         src="https://www.pikpng.com/pngl/b/603-6034862_header-banner-png-banner-images-header-png-clipart.png"/>
                </div>

                <div className={s.profileInfoBlock}>
                    <div>
                        <img className={s.mainPhoto} alt='avatar'
                             src={profile.photos?.large || 'https://www.nicepng.com/png/detail/914-9142519_doge-meme-dog-doggo-funny-sticker-momo-png.png'}/>
                        {isOwner &&
                        <div className={s.uploadImageButton}>
                            <input ref={inputFileRef}
                                   type='file'
                                   accept='.image/jpeg, .png, .jpg'
                                   onChange={(e) => onChangeAttachMainPhoto(e.target)}
                                   style={{display: 'none'}}/>
                            <Button color='secondary' endIcon={<AttachFile/>} size='small'
                                    className={s.downloadButton}
                                    onClick={() => inputFileRef.current && inputFileRef.current.click()}>
                                <span>Change avatar </span>
                            </Button>
                        </div>
                        }

                        {editMode ?
                            <ProfileDataForm profile={profile} setEditMode={setEditMode}/> :
                            <ProfileData profile={profile} isOwner={isOwner}
                                         goToEditMode={goToEditMode}/>}

                        <ProfileStatusWithHooks status={status}
                                                updateStatusTC={updateStatusTC}/>
                    </div>
                </div>
            </div>
            }
        </>

    )
}


type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}

export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div className={s.contact}><label>{contactTitle}</label> : {contactValue}</div>
}