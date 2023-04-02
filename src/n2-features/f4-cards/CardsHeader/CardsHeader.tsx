import React, {useState} from 'react'

import Typography from '@mui/material/Typography'
import {useNavigate} from 'react-router-dom'

import {PATH} from 'n1-main/m1-ui/routes/AppRoutes'
import {AddNewCardType} from 'n1-main/m3-dal/cardsAPI'
import {useAppSelector} from 'n1-main/m3-dal/store'

import {EditBar} from 'n2-features/f4-cards/c3-popover/EditBar'

import s from 'n2-features/f4-cards/CardsHeader/CardsHeader.module.scss'
import {
    cardsTotalCountSelector,
    packNameSelector,
    packUserIdSelector,
    userIdSelector
} from 'n1-main/m1-ui/common/selectors/selectors'
import { SuperButton} from "n1-main/m1-ui/common";
import {AddCardModal} from "n1-main/m1-ui/common/Modals/CardsModals/AddCardModal";
import {BasicModal} from "n1-main/m1-ui/common/Modals/BasicModal";

type CardsHeaderType = {
    onAddNewCard: (data: AddNewCardType) => void
    packId: string
}

export const CardsHeader = (props: CardsHeaderType) => {
    const userId = useAppSelector(userIdSelector)
    const packUserId = useAppSelector(packUserIdSelector)
    const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
    const packName = useAppSelector(packNameSelector)

    const navigate = useNavigate()

    const onLearnCards = () => {
        navigate(`${PATH.LEARN}/${props.packId}`)
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const buttonBackHandler = () => {
        navigate(PATH.PACKS)
    }

    return (
        <>
            <div className={s.headerContainer}>
                <SuperButton onClick={buttonBackHandler} style={{
                    letterSpacing: '0.01em',
                    fontSize: '16px',
                    width: '175px',
                }}>Back to cards</SuperButton>
                <div className={s.header}>
                    <Typography className={s.title}>{packName}</Typography>
                    {userId === packUserId && (
                        <EditBar
                            packId={props.packId}
                            packName={packName}
                            cardsTotalCount={cardsTotalCount}
                            packUserId={packUserId}
                        />
                    )}
                </div>
                {userId === packUserId ? (
                    <SuperButton
                        style={{
                            letterSpacing: '0.01em',
                            fontSize: '16px',
                            width: '175px',
                        }}
                        onClick={handleOpen}
                    >
                        Add new card
                    </SuperButton>
                ) : (
                    <SuperButton
                        style={{
                            letterSpacing: '0.01em',
                            fontSize: '16px',
                            width: '175px',
                        }}
                        disabled={cardsTotalCount === 0}
                        onClick={onLearnCards}
                    >
                        Learn to pack
                    </SuperButton>
                )}
            </div>
            <BasicModal handleClose={handleClose} open={open}>
                <AddCardModal pack_id={props.packId} handleClose={handleClose}/>
            </BasicModal>
        </>
    )
}
