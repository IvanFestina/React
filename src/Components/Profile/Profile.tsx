import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../redux/profileReducer/profileReducer";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatusTC: (status: string) => void
}

export const Profile = ({profile, status, updateStatusTC}: ProfilePropsType) => {

    return (
        <>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatusTC={updateStatusTC}

            />
             {/*@ts-ignore*/}
            <MyPostsContainer/>
        </>
    )
}
