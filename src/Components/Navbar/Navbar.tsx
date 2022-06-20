import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {Friends} from "./Friends/Friends";
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/redux-store";
import {friends} from "../../bll/sidebarReducer";
import {Paper} from "@mui/material";

export const Navbar = () => {
    const friends = useSelector<AppStateType, friends[]>(state => state.sideBar.friends)

    let friendsElements = friends.map(f => <Friends name={f.name} img={f.img}/>)

    return (
        <nav className={s.nav}>
            <div>
                <NavLink to={'/profile'} activeClassName={s.activeStyle}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={'/dialogs'}
                         activeClassName={s.activeStyle}>Messages</NavLink>
            </div>
            <div>
                <NavLink to={'/users'} activeClassName={s.activeStyle}>Users</NavLink>
            </div>
            <div>
                <NavLink to={'/news'} activeClassName={s.activeStyle}>News</NavLink>
            </div>
            <div>
                <NavLink to={'/music'} activeClassName={s.activeStyle}>Music</NavLink>
            </div>
            <div>
                <NavLink to={'/settings'}
                         activeClassName={s.activeStyle}>Settings</NavLink>
            </div>
            <div className={s.friendsBlock}>
                <Paper style={{background: '#b68f38'}} elevation={4}>
                    <h1>Friends</h1>
                    <div className={s.friendsList}>
                        {friendsElements}
                    </div>
                </Paper>
            </div>
        </nav>
    )
}
