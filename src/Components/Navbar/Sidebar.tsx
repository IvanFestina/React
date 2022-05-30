import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {Friends} from "./Friends/Friends";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {friends} from "../../redux/sidebarReducer";

export const Sidebar = () => {
    const friends = useSelector<AppStateType, friends[]>(state => state.sideBar.friends)

    let friendsElements = friends.map(f => <Friends name={f.name} img={f.img}/>)

    return (
        <nav className={s.nav}>
            <div>
                <NavLink to={'/profile'} activeClassName={s.activeStyle}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={'/dialogs'}  activeClassName={s.activeStyle}>Messages</NavLink>
            </div>
            <div>
                <NavLink to={'/users'} activeClassName={s.activeStyle}>Users</NavLink>
            </div>
            <div>
                <NavLink to={'/news'}  activeClassName={s.activeStyle}>News</NavLink>
            </div>
            <div>
                <NavLink to={'/music'}  activeClassName={s.activeStyle}>Music</NavLink>
            </div>
            <div>
                <NavLink to={'/settings'} activeClassName={s.activeStyle}>Settings</NavLink>
            </div>
            {/* <div>*/}
            {/*    <NavLink to={'/settings'} className={({isActive}) =>*/}
            {/*        isActive ? s.activeStyle : s.item}>Settings</NavLink>*/}
            {/*</div>*/}
            <div>
                <h1>Friends</h1>
                <div className={s.friendsBlock}>
                    {friendsElements}
                </div>
            </div>
        </nav>
    )
}
