import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../redux/profileReducer/profileReducer";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatusTC: (status: string) => void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <>
            <ProfileInfo profile={props.profile}
            status={props.status}
            updateStatusTC={props.updateStatusTC}
            />
            <MyPostsContainer/>
        </>
    )
}
