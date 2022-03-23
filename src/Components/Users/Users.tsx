import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import {NavLink} from "react-router-dom";
import {InitialStateUserType} from "../../redux/usersReducer/userReducer";

export type UsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    usersPage: InitialStateUserType
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
}
export const Users = (props: UsersPropsType) => {

    let pageCount = Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize)
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {
                    pages.map(p => <span className={props.usersPage.currentPage === p ? s.selectedPage : ''}
                                         onClick={(e) => props.onPageChanged(p)}>{p}</span>)
                }
            </div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto} alt={''}/>
                    </NavLink>
                </div>
                 <div>
                    {u.followed
                        //если хоть одна id из массива равна id пользователя - тогда disabled
                        ?
                        <button disabled={props.usersPage.followingInProgress
                        .some(id => id === u.id)}
                                onClick={() => { props.unFollowTC(u.id) }}>Unfollow</button>
                        : <button disabled={props.usersPage.followingInProgress
                        .some(id => id === u.id)}
                                  onClick={() => { props.followTC(u.id) }}>Follow</button>}
                </div>
            </span>
                    <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location?.country}</div>
                    <div>{u.location?.city}</div>
                </span>
            </span>
                </div>)
            }
        </div>
    )
}