import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../redux/profileReducer";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";

type ProfilePropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatusTC: (status: string) => void
        savePhotoTC: () => void
}

export const Profile = ({profile, status, updateStatusTC, isOwner, savePhotoTC}: ProfilePropsType) => {

    return (
        <>
            <ProfileInfo isOwner={isOwner}
                         profile={profile}
                         status={status}
                         updateStatusTC={updateStatusTC}
                         savePhotoTC={savePhotoTC}

            />
            {/*@ts-ignore*/}
            <MyPostsContainer/>
        </>
    )
}
