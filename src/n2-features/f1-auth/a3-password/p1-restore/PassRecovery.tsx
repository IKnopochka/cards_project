import React, { useState } from 'react'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from 'n1-main/m1-ui/routes/AppRoutes'
import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { getNewToken } from 'n1-main/m2-bll/authSlice'
import {emailCheckReg} from 'n1-main/m1-ui/utils'

import style from 'n2-features/f1-auth/a3-password/p1-restore/PassRecovery.module.scss'
import {appLoadingStatusSelector, isSendedEmailSelector} from 'n1-main/m1-ui/common/selectors/selectors'
import {CommonInput, SuperButton} from "n1-main/m1-ui/common";

interface FormValues {
  email: string
}

export const PassRecovery = () => {
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()
  const isSendedEmail = useAppSelector(isSendedEmailSelector)
  const appStatus = useAppSelector(appLoadingStatusSelector)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = data => {
    setEmail(data.email)
    dispatch(getNewToken(data.email))
  }

  if (isSendedEmail) {
    navigate(`${PATH.CHECK_EMAIL}/${email}`)
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={style.title}>Forgot your password?</h1>
        <Controller
          rules={{
            pattern: {
              value: emailCheckReg,
              message: 'Email is not valid',
            },
            required: 'Field is required',
            maxLength: { value: 30, message: 'Maximum length of email is 30 symbols' },
          }}
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <div className={style.item}>
              <CommonInput
                autoComplete={'email'}
                onChange={onChange} // send value to hook form
                error={errors.email?.message}
                fieldname={'Email'}
              />
            </div>
          )}
        />

        <p className={style.item}>
          Enter you email address and we will send you further instructions
        </p>
        <SuperButton
          style={{ marginTop: '60px', letterSpacing: '0.01em', fontSize: '1.3rem' }}
          type="submit"
          disabled={appStatus === 'loading'}
        >
          Submit
        </SuperButton>
        <p>Did you remember you password?</p>

        <NavLink className={style.navLinkSignIn} to={PATH.LOGIN}>
          Try logging in
        </NavLink>
      </form>
    </div>
  )
}
