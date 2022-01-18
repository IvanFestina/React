import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../redux/old-store";
import {MyPostsContainer} from "./MyPosts/Post/MyPostsContainer";



export const Profile = (props: any) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
