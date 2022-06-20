import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css'
import {authInitialStateType} from "../../bll/auth-reducer";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {AppBar, Box, Toolbar} from "@mui/material";

type HeaderPropsType = {
    authState: authInitialStateType
    logoutTC: () => void
}

export const Header = ({logoutTC, ...props}: HeaderPropsType) => {
    const dispatch = useDispatch()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: '#34421e'}}>
                <Toolbar>
                    <img alt="Лого"
                         src="https://images.squarespace-cdn.com/content/v1/575a6067b654f9b902f452f4/1552683653140-0UUVQSSUEWVC73AWAEQG/300Logo.png"/>
                    <div className={s.loginBlock}>
                        {props.authState.isAuth
                            ?
                            <div className={s.loginNameAndLogOut}>{props.authState.login}
                                <Button
                                    variant='contained' size='small'
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
