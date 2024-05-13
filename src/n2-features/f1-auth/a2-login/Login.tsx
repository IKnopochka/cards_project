import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import { PATH } from 'n1-main/m1-ui/routes/AppRoutes'
import { LoginType } from 'n1-main/m3-dal/authAPI'
import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { loginTC } from 'n1-main/m2-bll/authSlice'

import s from 'n2-features/f1-auth/a2-login/Login.module.scss'
import {PasswordInput, SuperButton} from 'n1-main/m1-ui/common'
import {appLoadingStatusSelector, isLoggedInSelector} from "n1-main/m1-ui/common/selectors/selectors";

export const Login: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const appStatus = useAppSelector(appLoadingStatusSelector)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<LoginType> = (data: LoginType) => {
    dispatch(loginTC(data))
  }

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        m: 1,
        width: '413px',
        height: '552px',
        margin: '50px auto',
      }}
    >
      <Paper elevation={3}>
        <div className={s.paperContainer}>
          <div className={s.title}>Sign in</div>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={{ m: 1, width: '347px' }}
              id="email"
              label="Email"
              variant="standard"
              defaultValue={"irinaredhood@gmail.com"}
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', { required: 'Email is a required field!' })}
            />
            <PasswordInput id="password" register={register} error={errors.password} />

            <div className={s.rememberMe}>
              <Checkbox id="rememberMe" {...register('rememberMe')} />
              <span>Remember me</span>
            </div>
            <NavLink to={PATH.PASSWORD_RESTORE} className={s.forgot}>
              Forgot Password?
            </NavLink>
            <SuperButton
              style={{
                marginTop: '69px',
                letterSpacing: '0.01em',
                fontSize: '1.3rem',
                width: '347px',
              }}
              type="submit"
              disabled={appStatus === 'loading'}
            >
              Sign In
            </SuperButton>
          </form>
          <div className={s.already}>Already have an account?</div>
          <NavLink to={'/registration'} className={s.singUp}>
            Sign Up
          </NavLink>
        </div>
      </Paper>
    </Box>
  )
}
