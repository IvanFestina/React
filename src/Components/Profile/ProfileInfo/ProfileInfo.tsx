import React, {ChangeEvent, ChangeEventHandler, useRef, useState} from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType, savePhotoTC} from "../../../redux/profileReducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import Button from "@mui/material/Button";
import {AttachFile} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import Typography from "@mui/material/Typography";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatusTC: (status: string) => void
    savePhotoTC: () => void
}

export const ProfileInfo = ({
                                profile,
                                updateStatusTC,
                                status,
                                isOwner
                            }: ProfileInfoPropsType) => {
    let dispatch = useDispatch()
    const [image, setImage] = useState<string>('');

    const inputFileRef = useRef<HTMLInputElement>(null);

    const onChangeAttachMainPhoto = (target: HTMLInputElement) => {
        debugger
        if (target.files && target.files.length) {
            dispatch(savePhotoTC(target.files[0]))
        }
    }

    if (!profile) {
        return <Preloader/>
    }

    return (
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
                    <div className={s.profileInfo}>
                        <div>
                            <p>Full name</p>: {profile.fullName}
                        </div>
                        <div>
                            <p>Looking for a job</p>: {profile.lookingForAJob ? "yes" : "no"}
                        </div>
                        <div>
                            <p>My professional skills</p>: {profile.lookingForAJob}
                        </div>
                        <div>
                            <p>About me</p>: {profile.aboutMe}
                        </div>
                        <div className={s.contacts}>
                            <p>Contacts</p>: {profile.contacts && Object.entries(profile.contacts).map(value => {
                            return value[0] && <Contact key={value[0]} contactTitle={value[0]} contactValue={value[1]}/>

                            })}
                        </div>
                    </div>
                    <ProfileStatusWithHooks status={status}
                                            updateStatusTC={updateStatusTC}/>
                </div>

            </div>
        </div>
    )
}


type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}

export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div><p>{contactTitle}</p> : {contactValue}</div>
}