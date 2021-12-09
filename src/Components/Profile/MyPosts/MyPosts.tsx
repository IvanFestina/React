import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

export const MyPosts = (type: any) => {
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
                <Post message="Hello, my name's Ivan" likesCount={0}/>
                <Post message="I'm fine, thanks" likesCount={21}/>
            </div>
        </div>
    )
}