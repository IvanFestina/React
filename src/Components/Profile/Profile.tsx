import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../redux/profileReducer/profileReducer";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";

type ProfilePropsType = {
    profile: ProfileType | null
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}
