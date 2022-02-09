import React from "react";
import {MyPosts} from "../MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../../redux/redux-store";
import {postsObjectType} from "../../../../redux/profileReducer/types";
import {Dispatch} from "redux";
import {addPostAC, updateNewPostTextAC} from "../../../../redux/profileReducer/action";


type MapStatePropsType = {
    posts: Array<postsObjectType>
    textForNewPost: string
}
type MapDispatchPropsType = {
    addPost: (textForNewPost: string) => void
    updateNewPostText: (text: string) => void
}

const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        textForNewPost: state.profilePage.textForNewPost
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType  => {
    return {
        addPost: (textForNewPost: string) => dispatch(addPostAC(textForNewPost)),
        updateNewPostText: (text: string) => dispatch(updateNewPostTextAC(text)),
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);