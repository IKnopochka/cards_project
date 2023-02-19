import React from 'react';
import {NavLink} from 'react-router-dom'
import {PATH} from "../routes/Pages";
import s from './Header.module.css'

const Header = () => {
    return (
        <div className={s.nav}>
            <NavLink to={PATH.LOGIN}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION}>REGISTRATION</NavLink>
            <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
            <NavLink to={PATH.ERROR404}>ERROR404</NavLink>
            <NavLink to={PATH.PASSWORD_RESTORE}>PASSWORD_RESTORE</NavLink>
            <NavLink to={PATH.NEW_PASSWORD}>NEW_PASSWORD</NavLink>
            <NavLink to={PATH.TEST_SUPER_COMPONENTS}>TEST_SUPER_COMPONENTS</NavLink>
        </div>
    );
};

export default Header;