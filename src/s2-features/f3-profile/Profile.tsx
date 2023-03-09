import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../s1-main/m2-bll/store";
import {Navigate} from 'react-router-dom'
import {PATH} from "../f1-header/routes/Pages";
import s from "./Profile.module.scss";
import style from "./Profile.module.scss";
import {changeProfileName, getIsAuthUser, logout} from "../../s1-main/m2-bll/auth-reducer";
import {Paper} from "@material-ui/core";
import PersonalInfo from "./PersonalInfo/PersonalInfo";

export const Profile = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const userInfo = useAppSelector(state => state.auth.profile)

    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {

        dispatch(getIsAuthUser())
    }, [])

    const onNameChangeHandler = useCallback((newName: string) => {
        dispatch(changeProfileName(newName))
    }, []);

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return (
        <div>
            <div className={style.container}>
                    <PersonalInfo profile={userInfo}
                                  onChangeHandler={onNameChangeHandler}
                                  logoutHandler={logoutHandler}/>
            </div>
        </div>
    );
}
