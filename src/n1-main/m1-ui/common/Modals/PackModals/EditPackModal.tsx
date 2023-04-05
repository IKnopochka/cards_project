import React, { useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { BasicModal } from 'n1-main/m1-ui/common/Modals/BasicModal'

import { UpdatePackType } from 'n1-main/m3-dal/packsAPI'
import { UploadImage } from 'n1-main/m1-ui/common/UploadImage/UploadImage'

type EditPackModalType = {
  onEditHandle: (data: UpdatePackType) => void
  packId: string
  packName: string
  hasText?: boolean
  packCover: string | undefined
}

export const EditPackModal = ({
  packId,
  packName,
  onEditHandle,
  packCover,
  ...props
}: EditPackModalType) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const { register, handleSubmit, reset, setValue } = useForm<UpdatePackType>()

  const onSubmit: SubmitHandler<UpdatePackType> = (data: UpdatePackType) => {
    onEditHandle({ ...data, _id: packId })
    handleClose()
  }

  return (
    <>
      <IconButton color={'secondary'} onClick={handleOpen}>
        <BorderColorIcon style={{ marginRight: '4px' }} />
        {props.hasText && <span>Edit</span>}
      </IconButton>

      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          EDIT PACK
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UploadImage buttonName={'Update cover'} setValue={setValue} cover={packCover} valueId={'deckCover'}/>
          <TextField
            sx={{ mt: 2, width: '100%' }}
            id="pack-name"
            label="Edit pack's name"
            variant="standard"
            margin="normal"
            defaultValue={packName}
            {...register('name')}
          />
          <Typography>
            <Checkbox id="private-pack" {...register('private')} />
            Private pack
          </Typography>

          <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
            <Button variant={'outlined'} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant={'contained'} color={'primary'} type={'submit'}>
              Save
            </Button>
          </Typography>
        </form>
      </BasicModal>
    </>
  )
}
