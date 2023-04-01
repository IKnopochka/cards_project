import React from 'react'

import logOutIcon from 'n1-main/m1-ui/images/logout.svg'
import { useAppDispatch } from 'n1-main/m3-dal/store'
import { logOutTC } from 'n1-main/m2-bll/authSlice'

import style from 'n1-main/m1-ui/common/LogOutButton/LogOutButton.module.scss'
import {SuperButton} from "n1-main/m1-ui/common/SuperButton/SuperButton";

export const LogOutButton = () => {
  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(logOutTC())
  }

  return (
    <div className={style.container}>
      <SuperButton
        onClick={logOut}
        style={{
          backgroundColor: 'white',
          padding: 0,
          width: '100%',
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '500',
        }}
      >
        <img src={logOutIcon} className={style.svg} />
        <div>Log out</div>
      </SuperButton>
    </div>
  )
}
