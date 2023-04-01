import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 'n1-main/m3-dal/store'
import { PATH } from 'n1-main/m1-ui/routes/AppRoutes'

import s from 'n1-main/m1-ui/header/Header.module.scss'
import { ProfileMenu } from 'n1-main/m1-ui/header/ProfileMenu/ProfileMenu'
import {SuperButton} from "n1-main/m1-ui/common";
import {isLoggedInSelector} from "n1-main/m1-ui/common/selectors/selectors";

const Header = () => {
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)
  const navigate = useNavigate()
  const loginHandler = () => navigate(PATH.LOGIN)

  return (
    <div className={s.nav}>
      <AppBar position="static" color={'inherit'}>
        <Toolbar className={s.toolBar}>
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <SuperButton style={{ width: '113px' }} onClick={loginHandler}>
              Sign in
            </SuperButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
