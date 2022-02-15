import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import {InitialStateType} from "../../redux/usersReducer/types";
import {NavLink} from "react-router-dom";
import {deleteFollow, postFollow} from "../../api/api";

export type UsersPropsType = {
    followAC: (userID: number) => void
    unFollowAC: (userID: number) => void
    setUsersTotalCountAC: (totalCount: number) => void
    onPageChanged: (pageNumber: number) => void
    usersPage: InitialStateType
    setToggleFollowingProgressAC: (isFetching: boolean, userId: number) => void


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
                        <button disabled={props.usersPage.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.setToggleFollowingProgressAC(true, u.id)
                                    deleteFollow(u.id)  //axios
                                        .then(data => {
                                            if (data.resultCode === 0) {
                                                props.unFollowAC(u.id);
                                            }
                                            props.setToggleFollowingProgressAC(false, u.id)

                                        })

                                }}>Unfollow</button>
                        : <button disabled={props.usersPage.followingInProgress.some(id => id === u.id)}
                                  onClick={() => {
                                      props.setToggleFollowingProgressAC(true, u.id)
                                      postFollow(u.id)   //axios
                                          .then(data => {
                                              if (data.resultCode === 0) {
                                                  props.followAC(u.id);
                                              }
                                              props.setToggleFollowingProgressAC(false, u.id)

                                          })
                                  }}>Follow</button>}
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