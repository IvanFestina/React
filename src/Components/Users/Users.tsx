import React from "react";
import s from './Users.module.css';
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";

export const Users = (props: UsersPropsType) => {
    if (props.usersPage.users.length === 0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers()
        })


    }


    return (
        <div>
            {props.usersPage.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photoUrl} className={s.userPhoto} alt={''}/>
                </div>
                 <div>
                    {u.followed
                        ? <button onClick={() => {
                            props.unFollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
                        }}>Follow</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>

                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </span>

            </div>)}
        </div>
    );
}
