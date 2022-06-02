import React from "react";
import s from "./User.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import {NavLink} from "react-router-dom";
import {InitialStateUserType, UserObjectType} from "../../redux/userReducer";
import Button from "@mui/material/Button";

export type UsersPropsType = {
    user: UserObjectType
    usersPage: InitialStateUserType
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    key: number
}
export const User = ({
                         key,
                         user,
                         usersPage,
                         followTC,
                         unFollowTC
                     }: UsersPropsType) => {
    return (
        <div className={s.userBlock}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto}
                         className={s.userPhoto} alt={''}/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    //если хоть одна id из массива равна id пользователя - тогда disabled
                    ?
                    <Button variant='contained' size='small' disabled={usersPage.followingInProgress
                        .some(id => id === user.id)}
                            onClick={() => {
                                unFollowTC(user.id)
                            }}>Unfollow</Button>
                    : <Button variant='contained' size='small' disabled={usersPage.followingInProgress
                        .some(id => id === user.id)}
                              onClick={() => {
                                  followTC(user.id)
                              }}>Follow</Button>}
            </div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div>
                    <div>{user.location?.country}</div>
                    <div>{user.location?.city}</div>
                </div>
        </div>
    )
}