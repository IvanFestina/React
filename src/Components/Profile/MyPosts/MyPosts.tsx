import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postsObjectType} from "../../../redux/state";

type PropsType = {
    posts: Array<postsObjectType>
    messageForNewPost: string
    addPostCallback: (message: string) => void
    changeNewTextCallback: (newText:string) => void
}

export const MyPosts = (props: PropsType) => {
    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
    // const postMessageRef = React.createRef<HTMLTextAreaElement>();


    const addPost = () => {
            props.addPostCallback(props.messageForNewPost)
    }
    const newTextChandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewTextCallback(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={newTextChandler} value={props.messageForNewPost} />
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