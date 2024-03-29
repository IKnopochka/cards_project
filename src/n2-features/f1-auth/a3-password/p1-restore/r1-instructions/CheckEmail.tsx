import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useLocation, useNavigate } from 'react-router-dom'

import emailImg from 'n1-main/m1-ui/images/emailImg.svg'

import s from 'n2-features/f1-auth/a3-password/p1-restore/r1-instructions/CheckEmail.module.scss'

export const CheckEmail: FC = () => {
  const navigate = useNavigate()
  const onClickHandler = () => {
    return navigate('/login')
  }
  const location = useLocation()
  const email = location.pathname.split('/').pop()

  return (
    <Box
      sx={{
        width: '413px',
        height: '552px',
        m: '60px auto',
      }}
    >
      <Paper elevation={3}>
        <div className={s.containerPaper}>
          <div className={s.title}>Check Email</div>
          <img className={s.img} src={emailImg} alt="emailImg" />
          <p className={s.text}>{`We’ve sent an Email with instructions to ${email}`}</p>
          <Button
            sx={{
              width: '347px',
              borderRadius: '30px',
              m: '41px 0 48px ',
              background: '#366EFF',
              letterSpacing: '0.01em',
            }}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
            onClick={onClickHandler}
          >
            Back to login
          </Button>
        </div>
      </Paper>
    </Box>
  )
}
