import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../redux/state";

type PropsType = {
    profilePage: profilePageType
    addPostCallback: (postMessage: string) => void
    changeNewTextCallback: (newText: string) => void
}


export const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     messageForNewPost={props.profilePage.messageForNewPost}
                     addPostCallback={props.addPostCallback}
                     changeNewTextCallback={props.changeNewTextCallback}
                     />
        </div>
    )
}
