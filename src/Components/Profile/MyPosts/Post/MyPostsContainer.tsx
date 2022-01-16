import React from "react";
import {MyPosts} from "../MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../../redux/profile-reducer";
import {ActionsTypes, StoreType} from "../../../../redux/store";

type PropsType = {
    store: StoreType
    dispatch: (action: ActionsTypes) => void
}

export const MyPostsContainer = ({store, dispatch, ...props}: PropsType) => {
    const state = store.getState()
    const addPostOnClickHandler = () => {
        dispatch(addPostAC(state.profilePage.messageForNewPost))
    }
    const textareaOnChangeHandler = (text: string) => {
        dispatch(updateNewPostTextAC(text))
    }
    return <MyPosts posts={state.profilePage.posts}
                    messageForNewPost={state.profilePage.messageForNewPost}
                    updateNewPostText={textareaOnChangeHandler}
                    addPost={addPostOnClickHandler}/>
}