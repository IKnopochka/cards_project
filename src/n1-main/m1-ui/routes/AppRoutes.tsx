import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Cards } from 'n2-features/f4-cards/Cards'
import { CreateNewPassword } from 'n2-features/f1-auth/a3-password/p2-create/CreateNewPassword'
import { ErrorPage } from 'n1-main/m1-ui/common/ErrorPage/ErrorPage'
import { Learn } from 'n2-features/f5-learn/Learn'
import { Login } from 'n2-features/f1-auth/a2-login/Login'
import { Packs } from 'n2-features/f3-packs/Packs'
import { CheckEmail } from 'n2-features/f1-auth/a3-password/p1-restore/r1-instructions/CheckEmail'
import { PassRecovery } from 'n2-features/f1-auth/a3-password/p1-restore/PassRecovery'
import { Profile } from 'n2-features/f2-profile/Profile'
import { Registration } from 'n2-features/f1-auth/a1-registration/Registration'

import { PrivateRoutes } from 'n1-main/m1-ui/routes/PrivateRoutes'

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
