import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";


type MyPostsPropsType = {message: string; likesCount: number}

export const MyPosts = (props: MyPostsPropsType) => {
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea> </textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                <Post message={props.message} likesCount={props.likesCount} />
            </div>
        </div>
    )
}