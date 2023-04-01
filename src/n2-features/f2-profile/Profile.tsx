import React, { useCallback } from 'react'

import { NavLink, Navigate, useNavigate} from 'react-router-dom'

import style from 'n2-features/f2-profile/Profile.module.scss'

import { PATH } from 'n1-main/m1-ui/routes/AppRoutes'
import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { changeProfileName } from 'n1-main/m2-bll/authSlice'
import {ProfileAvatar} from "n2-features/f2-profile/ProfileAvatar/ProfileAvatar";
import {EditableSpan} from "n1-main/m1-ui/common/EditableSpan/EditableSpan";
import {LogOutButton} from "n1-main/m1-ui/common/LogOutButton/LogOutButton";
import {SuperButton} from "n1-main/m1-ui/common";
import {isLoggedInSelector, userInfoSelector} from "n1-main/m1-ui/common/selectors/selectors";

export const Profile = () => {
  const userInfo = useAppSelector(userInfoSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const dispatch = useAppDispatch()
    const navigate = useNavigate()

  const onNameChangeHandler = useCallback((newName: string) => {
    dispatch(changeProfileName(newName))
  }, [])

  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />
  //if (!isLoggedIn) return navigate(PATH.LOGIN)

  return (
      <div className={style.container}>
          <div className={style.form}>
              <NavLink to={PATH.PACKS}>
                  <SuperButton className={style.button}>Open packs</SuperButton>
              </NavLink>

              <h2 className={style.title}>Personal Information</h2>

              <ProfileAvatar size={100} withButton />

              <div className={style.name}>
                  <EditableSpan value={userInfo.name} onChange={onNameChangeHandler} />
              </div>
              <div className={style.email}>{userInfo.email}</div>
              <LogOutButton />
          </div>
      </div>
  )
}
