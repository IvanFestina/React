import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profileReducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileInfo = ({profile, updateStatusTC, status}: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.background}>
                <img alt="background img"
                     src="https://www.pikpng.com/pngl/b/603-6034862_header-banner-png-banner-images-header-png-clipart.png"/>
            </div>
            <div className={s.ava}>
                <img alt='avatar'
                     src='https://www.nicepng.com/png/detail/914-9142519_doge-meme-dog-doggo-funny-sticker-momo-png.png'/>
            </div>
            <div className={s.descriptionBlock}>
                {profile.photos.large &&
                <img alt={'avatar'} src={profile.photos.large}/>}
                <ProfileStatusWithHooks status={status}
                                        updateStatusTC={updateStatusTC}/>
            </div>
        </div>
    )
}

