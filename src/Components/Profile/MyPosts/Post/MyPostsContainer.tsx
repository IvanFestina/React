import React from "react";
import {MyPosts} from "../MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/redux-store";
import {addPostAC, postsObjectType, updateNewPostTextAC} from "../../../../redux/profileReducer/profileReducer";



// type MapDispatchPropsType = {
//     addPost: (textForNewPost: string) => void
//     updateNewPostText: (text: string) => void
// }

type MapStatePropsType = {
    posts: Array<postsObjectType>
    textForNewPost: string
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        textForNewPost: state.profilePage.textForNewPost
    }
}

export const MyPostsContainer = connect(mapStateToProps, {addPostAC, updateNewPostTextAC})(MyPosts);