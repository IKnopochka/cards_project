import React, { useState } from 'react'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { BasicModal } from 'n1-main/m1-ui/common/Modals/BasicModal'

type DeleteModalPropsType = {
  id: string
  name: string
  onDeleteHandle: (id: string) => void
  hasText?: boolean
}

export const DeleteCardModal = ({
  id,
  name,
  onDeleteHandle,
  ...props
}: DeleteModalPropsType) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <IconButton color={'secondary'} onClick={handleOpen}>
        <DeleteSweepIcon style={{ marginRight: '4px' }} />
        {props.hasText && <span>Delete</span>}
      </IconButton>
      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          DELETE CARD
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Do you really want to delete this card?
          <br />
          Card will be deleted
        </Typography>
        <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
          <Button variant={'outlined'} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={'contained'} color={'error'} onClick={() => onDeleteHandle(id)}>
            Delete
          </Button>
        </Typography>
      </BasicModal>
    </>
  )
}
