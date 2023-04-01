import React, { FC } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'n1-main/m3-dal/store'
import { logOutTC } from 'n1-main/m2-bll/authSlice'
import { PATH } from 'n1-main/m1-ui/routes/AppRoutes'

type MenuEditBarPropsType = {
  open: boolean
  handleMenuClose: () => void
  anchorEl: null | HTMLElement
  id: string | undefined
}

export const MenuEditBar: FC<MenuEditBarPropsType> = ({ id, open, handleMenuClose, anchorEl }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const profileOnclick = () => {
    navigate(PATH.PROFILE)
    handleMenuClose()
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper sx={{ width: 122, maxWidth: '100%' }}>
          <MenuList>
            <MenuItem onClick={profileOnclick}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => dispatch(logOutTC())}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </ThemeProvider>
  )
}
