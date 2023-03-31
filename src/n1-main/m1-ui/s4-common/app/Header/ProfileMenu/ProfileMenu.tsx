import React, { useCallback, useState } from 'react'

import { useAppSelector } from 'n1-main/m3-dal/store'
import { ProfileAvatar } from 'n2-features/f2-profile/ProfileAvatar/ProfileAvatar'
import { userNameSelector } from 'n1-main/m1-ui/s4-common/index'

import { MenuEditBar } from 'n1-main/m1-ui/s4-common/app/Header/ProfileMenu/MenuEditBar/MenuEditBar'
import s from 'n1-main/m1-ui/s4-common/app/Header/ProfileMenu/ProfileMenu.module.scss'

export const ProfileMenu = () => {
  const userName = useAppSelector(userNameSelector)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const openProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <div className={s.container} onClick={openProfileMenu}>
        <span className={s.name}>{userName}</span>
        <ProfileAvatar size={36} />
      </div>
      <MenuEditBar id={id} open={open} handleMenuClose={handleMenuClose} anchorEl={anchorEl} />
    </>
  )
}
