import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css'
import {authInitialStateType} from "../../bll/auth-reducer";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {AppBar, Box, Toolbar} from "@mui/material";
import logo from '../../assets/images/logoSmaller.jpg'

type HeaderPropsType = {
    authState: authInitialStateType
    logoutTC: () => void
}

export const Header = ({logoutTC, ...props}: HeaderPropsType) => {
    const dispatch = useDispatch()

    return (
        <Box sx={{flexGrow: 1}} className={s.header}>
            <AppBar position="static" style={{background: '#34421e'}}>
                <Toolbar className={s.toolbar}>
                    <img alt="Лого"
                         src={logo}/>
                    <div className={s.loginBlock}>
                        {props.authState.isAuth
                            ?
                            <div className={s.loginNameAndLogOut}>{props.authState.login}
                                <Button
                                    variant='contained'
                                    style={{margin: '13px'}}
                                    onClick={() => dispatch(logoutTC())}>Log out</Button>
                            </div>
                            : <NavLink
                                to={'/login'}>Login</NavLink>} {/*если isAuth === ture тогда логин отображается, если нет - кнопка*/}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
