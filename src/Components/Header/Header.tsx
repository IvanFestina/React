import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css'
import {authInitialStateType} from "../../redux/auth-reducer/auth-reducer";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";

type HeaderPropsType = {
    authState: authInitialStateType
    logoutTC: () => void
}

export const Header = ({logoutTC, ...props}: HeaderPropsType) => {
    const dispatch = useDispatch()

    return <header className={s.header}>
        <img alt="Лого"
             src="https://images.squarespace-cdn.com/content/v1/575a6067b654f9b902f452f4/1552683653140-0UUVQSSUEWVC73AWAEQG/300Logo.png"/>
        <div className={s.loginBlock}>
            {props.authState.isAuth
                ? <div>{props.authState.login} - <Button onClick={() => dispatch(logoutTC())}>Log out</Button></div>
                : <NavLink
                    to={'/login'}>Login</NavLink>} {/*если isAuth === ture тогда логин отображается, если нет - кнопка*/}

        </div>

    </header>
}
