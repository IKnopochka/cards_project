import React from 'react'

import logOutIcon from 'n1-main/m1-ui/s4-common/assets/img/logout.svg'
import { useAppDispatch } from 'n1-main/m3-dal/store'
import { logOutTC } from 'n1-main/m2-bll/authSlice'
import { SuperButton } from 'n1-main/m1-ui/s4-common/index'

import style from 'n1-main/m1-ui/s4-common/LogOutButton/LogOutButton.module.scss'

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
