import React from "react";
import {MyPosts} from "../MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/redux-store";
import {addPostAC, postsObjectType, updateNewPostTextAC} from "../../../../redux/profileReducer/profileReducer";
import {compose} from "redux";

type MapDispatchPropsType = {
    addPostAC: (textForNewPost: string) => void
    updateNewPostTextAC: (text: string) => void
}

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

export default compose<React.ComponentType>(connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {addPostAC, updateNewPostTextAC}))(MyPosts);
