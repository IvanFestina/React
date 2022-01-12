import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {
    ActionsTypes,
    postsObjectType,
} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";

type PropsType = {
    posts: Array<postsObjectType>
    messageForNewPost: string
    dispatch: (action: ActionsTypes) => void
}

export const MyPosts = (props: PropsType) => {
    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
    // const postMessageRef = React.createRef<HTMLTextAreaElement>();


    const addPostOnClickHandler = () => {
        props.dispatch(addPostAC(props.messageForNewPost))
    }
    const textareaOnChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.dispatch(updateNewPostTextAC(text))
    }


    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>я
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