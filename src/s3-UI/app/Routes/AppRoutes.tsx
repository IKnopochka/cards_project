import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Cards } from 's3-UI/Cards/Cards'
import { CreateNewPassword } from 's3-UI/CreateNewPassword/CreateNewPassword'
import { ErrorPage } from 's3-UI/ErrorPage/ErrorPage'
import { Learn } from 's3-UI/Learn/Learn'
import { Login } from 's3-UI/Login/Login'
import { Packs } from 's3-UI/Packs/Packs'
import { CheckEmail } from 's3-UI/PassRecovery/checkEmail/CheckEmail'
import { PassRecovery } from 's3-UI/PassRecovery/PassRecovery'
import { Profile } from 's3-UI/Profile/Profile'
import { Registration } from 's3-UI/Registration/Registration'

import { PrivateRoutes } from 's3-UI/app/Routes/PrivateRoutes'

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  ERROR404: '/errorPage',
  PASSWORD_RESTORE: '/passRecovery',
  NEW_PASSWORD: '/set-new-password/:token',
  CARDS: '/cards',
  PACKS: '/packs',
  CHECK_EMAIL: '/check-email',
  LEARN: '/learn',
} as const

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.ERROR404} element={<ErrorPage />} />
      <Route path={PATH.PASSWORD_RESTORE} element={<PassRecovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<CreateNewPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />

      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.CARDS} element={<Cards />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.LEARN + '/:packId'} element={<Learn />} />
      </Route>

      <Route path={'/*'} element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes
