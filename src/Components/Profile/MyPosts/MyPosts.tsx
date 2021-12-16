import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

type postsObjectType = {
    id: string;
    message: string
    likesCount: number
}
type PropsType = {
    posts: Array<postsObjectType>
}

export const MyPosts = (props: PropsType) => {
    const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        let text = newPostElement.current?.value;
        alert(text)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}> </textarea>
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