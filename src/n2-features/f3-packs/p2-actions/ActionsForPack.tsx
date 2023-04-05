import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import { Skeleton } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATH } from 'n1-main/m1-ui/routes/AppRoutes'
import {  UpdatePackType } from 'n1-main/m3-dal/packsAPI'
import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { deletePack, updatePack } from 'n1-main/m2-bll/packSlice'
import {appLoadingStatusSelector, userIdSelector} from "n1-main/m1-ui/common/selectors/selectors";
import {EditPackModal} from "n1-main/m1-ui/common/Modals/PackModals/EditPackModal";
import {DeletePackModal} from "n1-main/m1-ui/common/Modals/PackModals/DeletePackModal";

type ActionsPropsType = {
  packId: string
  packName: string
  totalCardsInPack: number
  id: string
  hasText?: boolean
  packCover: string | undefined
}

export const ActionsForPack = ({
  packId,
  packName,
  totalCardsInPack,
  id,
  packCover,
  ...props
}: ActionsPropsType) => {
  const userId = useAppSelector(userIdSelector)
  const appStatus = useAppSelector(appLoadingStatusSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#000',
      },
    },
  })

  const onStudyClick = () => {
    navigate(`${PATH.LEARN}/${packId}`)
  }

  if (appStatus === 'loading') {
    return <Skeleton height={40} />
  }

  const onDeletePackHandle = (id: string) => {
    dispatch(deletePack(id, paramsFromUrl))
  }

  const onEditPackHandle = (data: UpdatePackType) => {
    dispatch(updatePack(data, paramsFromUrl))
  }

  const style = props.hasText
    ? {
        display: 'flex',
        flexDirection: 'column',
      }
    : {}

  return (
    <Typography sx={style}>
      <ThemeProvider theme={theme}>
        {!totalCardsInPack ? (
          <IconButton disabled>
            <SchoolIcon style={{ marginRight: '4px' }} />
            {props.hasText && <span>Learn</span>}
          </IconButton>
        ) : (
          <IconButton color={'secondary'} onClick={onStudyClick}>
            <SchoolIcon color={'secondary'} style={{ marginRight: '4px' }} />
            {props.hasText && <span color={'black'}>Learn</span>}
          </IconButton>
        )}
        {id === userId && (
          <EditPackModal
            onEditHandle={onEditPackHandle}
            packId={packId}
            packName={packName}
            hasText={props.hasText}
            packCover={packCover}
          />
        )}
        {id === userId && (
          <DeletePackModal
            packId={packId}
            packName={packName}
            onDeleteHandle={onDeletePackHandle}
            hasText={props.hasText}
          />
        )}
      </ThemeProvider>
    </Typography>
  )
}
