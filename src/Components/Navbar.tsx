import React from "react";
import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div>
                <a className={s.nav_item}>Profile</a>
            </div>
            <div>
                <a className={s.nav}>Messages</a>
            </div>
            <div>
                <a className={s.nav}>News</a>
            </div>
            <div>
                <a className={s.nav}>Music</a>
            </div>
            <div>
                <a className={s.nav}>Settings</a>
            </div>
        </nav>
    )
}

export default Navbar