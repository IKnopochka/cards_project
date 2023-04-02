import React, { useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'

import { CardType } from 'n1-main/m3-dal/cardsAPI'
import {EditCardModal} from "n1-main/m1-ui/common/Modals/CardsModals/EditCardModal";
import {DeleteCardModal} from "n1-main/m1-ui/common/Modals/CardsModals/DeleteCardModal";
import {BasicModal} from "n1-main/m1-ui/common/Modals/BasicModal";

type ActionsPropsType = {
  onStudyClick: (id: string) => void
  card: CardType
}

export const ActionsForCards = (props: ActionsPropsType) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = () => {
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <div style={{ marginRight: '14px' }}>
      <BorderColorIcon style={{ marginRight: '8px' }} onClick={handleOpenEditModal} />
      <DeleteSweepIcon onClick={handleOpenDeleteModal} />
      <BasicModal handleClose={handleCloseEditModal} open={openEditModal}>
        <EditCardModal card={props.card} handleClose={handleCloseEditModal} />
      </BasicModal>
      <BasicModal handleClose={handleCloseDeleteModal} open={openDeleteModal}>
        <DeleteCardModal card={props.card} handleClose={handleCloseDeleteModal} />
      </BasicModal>
    </div>
  )
}
