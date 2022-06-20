import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../bll/profileReducer";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";

type ProfilePropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatusTC: (status: string) => void
    savePhotoTC: (file: File) => void
    saveProfileTC: (profile: Omit<ProfileType, "photos">) => void
}

export const Profile = ({
                            profile,
                            status,
                            updateStatusTC,
                            isOwner,
                            savePhotoTC,
                            saveProfileTC
                        }: ProfilePropsType) => {

    return (
        <>
            <ProfileInfo isOwner={isOwner}
                         profile={profile}
                         status={status}
                         updateStatusTC={updateStatusTC}
                         savePhotoTC={savePhotoTC}
                         saveProfileTC={saveProfileTC}

            />
            {/*@ts-ignore*/}
            <MyPostsContainer/>
        </>
    )
}
