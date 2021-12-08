import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (type: any) => {
    return (
        <div>
            My posts
            <div>
                <textarea> </textarea>
                <button>Add post</button>
            </div>
            <div className={s.posts}>
                <Post message="Hello, my names Ivan" likesCount={0}/>
                <Post message="I'm fine, thanks" likesCount={21}/>
            </div>
        </div>
    )
}

export default MyPosts