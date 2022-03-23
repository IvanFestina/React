import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postsObjectType} from "../../../redux/profileReducer/profileReducer";

type PropsType = {
    posts: Array<postsObjectType>
    textForNewPost: string
    updateNewPostText: (text: string) => void
    addPost: (textForNewPost: string) => void
}

export const MyPosts = ({addPost, textForNewPost, updateNewPostText, posts}: PropsType) => {
    const postsElements = posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const addPostOnClickHandler = () => {
        addPost(textForNewPost);
    }
    const textareaOnChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        updateNewPostText(text)
    }


    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={textareaOnChangeHandler} value={textForNewPost}/>
                </div>
                <div>
                    <button onClick={addPostOnClickHandler}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}