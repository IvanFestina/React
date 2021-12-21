import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../redux/state";

type PropsType = {
    profilePage: profilePageType
    addPost: (message: string) => void
}


export const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     addPost={props.addPost}
                     newPostText={props.profilePage.newPostText}
                     />
        </div>
    )
}
