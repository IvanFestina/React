import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {AddPostActionType, postsObjectType, updateNewPostTextActionType} from "../../../redux/state";

type PropsType = {
    posts: Array<postsObjectType>
    messageForNewPost: string
    dispatch: (action: AddPostActionType | updateNewPostTextActionType) => void
}

export const MyPosts = (props: PropsType) => {
    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
    // const postMessageRef = React.createRef<HTMLTextAreaElement>();


    const addPost = () => {
        props.dispatch({type: "ADD-POST", messageForNewPost: props.messageForNewPost})
    }
    const newTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.dispatch({type: "UPDATE-NEW-POST-TEXT", newText: text})
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={newTextHandler} value={props.messageForNewPost}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}