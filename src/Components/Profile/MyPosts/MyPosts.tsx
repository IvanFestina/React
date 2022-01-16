import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {
    postsObjectType,
} from "../../../redux/store";

type PropsType = {
    posts: Array<postsObjectType>
    messageForNewPost: string
    updateNewPostText: (text: string) => void
    addPost: () => void
}

export const MyPosts = (props: PropsType) => {
    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const addPostOnClickHandler = () => {
        props.addPost();
    }
    const textareaOnChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
    }


    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={textareaOnChangeHandler} value={props.messageForNewPost}/>
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