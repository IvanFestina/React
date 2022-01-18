import React from "react";
import {MyPosts} from "../MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../../redux/profile-reducer";
import {ActionsTypes, RootStateType} from "../../../../redux/old-store";
import {connect} from "react-redux";

const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profilePage.posts,
        textForNewPost: state.profilePage.textForNewPost
    }
}
const mapDispatchToProps = (dispatch:(actions: ActionsTypes) => void)  => {
    return {
        addPost: (textForNewPost: string) => dispatch(addPostAC(textForNewPost)),
        updateNewPostText: (text: string) => dispatch(updateNewPostTextAC(text)),
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);