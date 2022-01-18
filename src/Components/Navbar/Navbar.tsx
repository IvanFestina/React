import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {Friends} from "./Friends/Friends";
import {StoreType} from "../../redux/old-store";

type sideBarType = {
    store: StoreType
}

export const Navbar = ({store, ...props}: sideBarType) => {
    const state = store.getState()
    let friendsElements = state.sideBar.friends.map(f => <Friends name={f.name} img={f.img}/>)

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
            <div>
            <h1>Friends</h1>
            <div className={s.friendsBlock}>
             {friendsElements}
            </div>
            </div>
        </nav>
    )
}
