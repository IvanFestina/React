import React from "react";
import s from './Post.module.css'

type PostPropsType = { message: string, likesCount: number }
export const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img alt='ava' src='https://i.pinimg.com/originals/f1/08/a3/f108a3f0a39c70b8f7e56c642edb9327.png'/>
            { props.message }
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}
