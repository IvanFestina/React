import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css'
import {authInitialStateType} from "../../redux/auth-reducer/auth-reducer";

type HeaderPropsType = { auth: authInitialStateType }

export const Header = (props: HeaderPropsType) => {
    return <header className={s.header}>
        <img alt="Лого"
             src="https://images.squarespace-cdn.com/content/v1/575a6067b654f9b902f452f4/1552683653140-0UUVQSSUEWVC73AWAEQG/300Logo.png"/>
        <div className={s.loginBlock}>
            {props.auth.isAuth ? props.auth.login
                : <NavLink to={'/login'}>Login</NavLink>} {/*если isAuth === ture тогда логин отображается, если нет - кнопка*/}

        </div>

    </header>
}
