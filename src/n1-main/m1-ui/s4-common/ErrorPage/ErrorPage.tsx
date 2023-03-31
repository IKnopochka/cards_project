import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from 'n1-main/m1-ui/s4-common/app/Routes/AppRoutes'
import errorImg from 'n1-main/m1-ui/s4-common/assets/img/404.svg'
import { SuperButton } from 'n1-main/m1-ui/s4-common/index'

import s from 'n1-main/m1-ui/s4-common/ErrorPage/ErrorPage.module.scss'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className={s.container}>
      <div className={s.textContainer}>
        <h2 className={s.title}>Ooops!</h2>
        <span className={s.text}>Sorry! Page not found!</span>
        <SuperButton style={{ width: '218px' }} onClick={() => navigate(PATH.PACKS)}>
          Back to home page
        </SuperButton>
      </div>
      <img src={errorImg} alt="404" />
    </div>
  )
}
