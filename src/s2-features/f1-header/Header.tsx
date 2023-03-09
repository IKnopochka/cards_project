import React from 'react';
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {PATH} from "./routes/Pages";
import SuperButton from "../../s1-main/m1-ui/superComponents/c2-SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../s1-main/m2-bll/store";
import {logout} from "../../s1-main/m2-bll/auth-reducer";

const Header = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className={s.nav}>
            <AppBar position="static" color={'inherit'}>
                <Toolbar>
                    <Typography variant="h6">
                        <NavLink to={PATH.LOGIN}>Login</NavLink>
                        <NavLink to={PATH.REGISTRATION}>REGISTRATION</NavLink>
                        <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
                        <NavLink to={PATH.ERROR404}>ERROR404</NavLink>
                        <NavLink to={PATH.PASSWORD_RESTORE}>PASSWORD_RESTORE</NavLink>
                        <NavLink to={PATH.NEW_PASSWORD}>NEW_PASSWORD</NavLink>
                        <NavLink to={PATH.TEST_SUPER_COMPONENTS}>TEST_SUPER_COMPONENTS</NavLink>
                    </Typography>
                    {isLoggedIn && <SuperButton color="inherit" onClick={logoutHandler}>Log out</SuperButton>}
                </Toolbar>
            </AppBar>



        </div>
    );
};

export default Header;