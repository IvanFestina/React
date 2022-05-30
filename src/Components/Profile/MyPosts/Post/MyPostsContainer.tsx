import React from "react";
import {MyPosts} from "../MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/redux-store";
import {addPostAC, postsObjectType} from "../../../../redux/profileReducer";
import {compose} from "redux";

type MapDispatchPropsType = {
    addPostAC: (textForNewPost: string) => void
}

type MapStatePropsType = {
    posts: Array<postsObjectType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        addPostAC
    })
)(MyPosts);
