import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

let activeStyle: any = {
    color: 'deeppink'
};

const Navbar = (props: any) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to={'/profile'} style={({isActive}) =>
                    isActive ? activeStyle : undefined}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to={'/dialogs'} style={({isActive}) =>
                    isActive ? activeStyle : undefined}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={'/news'} style={({isActive}) =>
                    isActive ? activeStyle : undefined}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={'/music'} style={({isActive}) =>
                    isActive ? activeStyle : undefined}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={'/settings'} style={({isActive}) =>
                    isActive ? activeStyle : undefined}>Settings</NavLink>
            </div>
        </nav>
    )
}

export default Navbar