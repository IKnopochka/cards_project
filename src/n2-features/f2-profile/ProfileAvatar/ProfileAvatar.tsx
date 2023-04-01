import React, { ChangeEvent, FC } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import defaultAvatar from 'n1-main/m1-ui/images/defaultAvatar.svg'
import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { changeProfileImage } from 'n1-main/m2-bll/authSlice'

import s from 'n2-features/f2-profile/ProfileAvatar/ProfileAvatar.module.scss'
import {avatarSelector} from "n1-main/m1-ui/common/selectors/selectors";
import {convertFileToBase64} from "n1-main/m1-ui/utils";

type ProfileAvatarPropsType = {
  size: number
  withButton?: boolean
}

export const ProfileAvatar: FC<ProfileAvatarPropsType> = ({ size, withButton }) => {
  const avatar = useAppSelector(avatarSelector)

  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>, callback: (img: string) => void) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          callback(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const onChangeAvatar = (file64: string) => {
    dispatch(changeProfileImage(file64))
  }

  return (
    <div className={s.container}>
      <Avatar
        src={avatar ? avatar : defaultAvatar}
        style={{ width: `${size}px`, height: `${size}px` }}
        alt="ava"
      />
      {withButton && (
        <label>
          <input
            type="file"
            onChange={e => uploadHandler(e, onChangeAvatar)}
            style={{ display: 'none' }}
            accept="image/png, image/jpeg, image/svg"
          />
          <IconButton
            component="span"
            style={{
              position: 'absolute',
              bottom: '-12px',
              right: '-15px',
            }}
          >
            <CloudUploadIcon />
          </IconButton>
        </label>
      )}
    </div>
  )
}
