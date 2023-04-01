import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from 'n1-main/m3-dal/store'

import { PATH } from 'n1-main/m1-ui/routes/AppRoutes'
import {isLoggedInSelector} from "n1-main/m1-ui/common/selectors/selectors";

export const PrivateRoutes = () => {
  let isLoggedIn = useAppSelector(isLoggedInSelector)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
