import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader";
import {ProfileType} from "../../../redux/profileReducer/profileReducer";
import ProfileStatus from "./ProfileStatus";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";


type ProfileInfoPropsType = {
     profile: ProfileType | null
     status: string
     updateStatusTC: (status: string) => void
}


export const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
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
                <img alt={'avatar'} src={props.profile.photos.large}/>
                 <ProfileStatusWithHooks status={props.status} updateStatusTC={props.updateStatusTC}/>
            </div>
        </div>
    )
}

