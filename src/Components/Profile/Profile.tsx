import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/Post/MyPostsContainer";

type PropsType = {
    store: StoreType
}

export const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}
                     dispatch={props.store.dispatch}
            />
        </div>
    )
}
