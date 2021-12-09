import React from "react";
import s from './ProfileInfo.module.css'

export const ProfileInfo = (props: any) => {
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
                ava + description
            </div>
        </div>
    )
}
