import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import Error404 from "../../../s1-main/m1-ui/assets/Error404/Error404";


import PasswordRestore from "../../f4-password/PasswordRestore";
import NewPassword from "../../f4-password/NewPassword";
import TestSuperComponents from "../../f0-test/TestSuperComponents";
import {Profile} from "../../f3-profile/Profile";
import {Login} from "../../f2-auth/a1-login/Login";
import {Register} from "../../f2-auth/a2-register/Register";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    ERROR404: '/Error404',
    PASSWORD_RESTORE: '/password-restore',
    NEW_PASSWORD: '/new-password/:resetPasswordToken',
    TEST_SUPER_COMPONENTS: '/test'
}

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>

                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Register/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.ERROR404} element={<Error404/>}/>
                <Route path={PATH.PASSWORD_RESTORE} element={<PasswordRestore/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>

                <Route path={PATH.TEST_SUPER_COMPONENTS} element={<TestSuperComponents/>}/>

                <Route path={'/*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
};

export default Pages;