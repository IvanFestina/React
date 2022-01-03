import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AddPostActionType, profilePageType, updateNewPostTextActionType} from "../../redux/state";

type PropsType = {
    profilePage: profilePageType
    dispatch: (action: AddPostActionType | updateNewPostTextActionType) => void

}


export const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     messageForNewPost={props.profilePage.messageForNewPost}
                     dispatch={props.dispatch}
            />
        </div>
    )
}
