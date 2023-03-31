import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 'n1-main/m3-dal/store'
import { isLoggedInSelector, SuperButton } from 'n1-main/m1-ui/s4-common/index'
import { PATH } from 'n1-main/m1-ui/s4-common/app/Routes/AppRoutes'

import s from 'n1-main/m1-ui/s4-common/app/Header/Header.module.scss'
import { ProfileMenu } from 'n1-main/m1-ui/s4-common/app/Header/ProfileMenu/ProfileMenu'

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
              Sing in
            </SuperButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
