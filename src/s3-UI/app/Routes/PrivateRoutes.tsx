import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from 's1-DAL/store'
import { isLoggedInSelector } from 's4-common'

import { PATH } from 's3-UI/app/Routes/AppRoutes'

export const PrivateRoutes = () => {
  let isLoggedIn = useAppSelector(isLoggedInSelector)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
