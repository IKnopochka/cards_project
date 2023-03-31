import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 's1-DAL/store'
import { isLoggedInSelector, SuperButton } from 's4-common'
import { PATH } from 's3-UI/app/Routes/AppRoutes'

import s from 's3-UI/app/Header/Header.module.scss'
import { ProfileMenu } from 's3-UI/app/Header/ProfileMenu/ProfileMenu'

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
