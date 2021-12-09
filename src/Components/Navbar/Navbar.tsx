import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

export const Navbar = (props: any) => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to={'/profile'} className={({isActive}) =>
                    isActive ? s.activeStyle : s.item}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={'/dialogs'} className={({isActive}) =>
                    isActive ? s.activeStyle : s.item}>Messages</NavLink>
            </div>
            <div>
                <NavLink to={'/news'} className={({isActive}) =>
                    isActive ? s.activeStyle : s.item}>News</NavLink>
            </div>
            <div>
                <NavLink to={'/music'} className={({isActive}) =>
                    isActive ? s.activeStyle : s.item}>Music</NavLink>
            </div>
            <div>
                <NavLink to={'/settings'} className={({isActive}) =>
                    isActive ? s.activeStyle : s.item}>Settings</NavLink>
            </div>
        </nav>
    )
}
