import React from "react";
import s from './Friends.module.css'

type friendsType = {
    name: string
    img: string
}

export const Friends = (props: friendsType) => {
    return (
        <div className={s.mainBox}>

            <div>
                <div className={s.ava}>
                    <img alt='' src={props.img}/>
                    <p>{props.name}</p>
                </div>
            </div>
        </div>
    )
}