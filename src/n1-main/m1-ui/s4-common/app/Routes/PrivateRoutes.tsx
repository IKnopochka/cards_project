import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from 'n1-main/m3-dal/store'
import { isLoggedInSelector } from 'n1-main/m1-ui/s4-common/index'

import { PATH } from 'n1-main/m1-ui/s4-common/app/Routes/AppRoutes'

export const PrivateRoutes = () => {
  let isLoggedIn = useAppSelector(isLoggedInSelector)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
