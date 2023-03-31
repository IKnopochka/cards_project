import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

import { PATH } from 'n1-main/m1-ui/s4-common/app/Routes/AppRoutes'

export const BackToPacksList = () => {
  const navigate = useNavigate()
  const buttonBackOnClick = () => {
    navigate(PATH.PACKS)
  }

  return (
    <div style={{ display: 'flex', margin: '15px', alignItems: 'center' }}>
      <ArrowBackIcon onClick={buttonBackOnClick} />
      <span>Back to Packs List</span>
    </div>
  )
}
