import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postsObjectType} from "../../../redux/state";

type PropsType = {
    posts: Array<postsObjectType>
    addPost: (message: string) => void
    newPostText: string
}

export const MyPosts = (props: PropsType) => {
    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
    const postMessageRef = React.createRef<HTMLTextAreaElement>();


    let addPost = () => {
        if (postMessageRef.current) {
            props.addPost(postMessageRef.current.value)
            postMessageRef.current.value = ''
        }
    }

    // let onPostChange = () => {
    //     if (newPost)
    // }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={() => ('')} ref={postMessageRef} value={props.newPostText} />
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