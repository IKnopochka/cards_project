import React, {useEffect, useState} from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {SubmitHandler, useForm} from 'react-hook-form'

import {BasicModal} from 'n1-main/m1-ui/common/Modals/BasicModal'

import {UpdatePackType} from 'n1-main/m3-dal/packsAPI'
import {UploadImage} from 'n1-main/m1-ui/common/UploadImage/UploadImage'
import {CardType, UpdateCardType} from "n1-main/m3-dal/cardsAPI";

type EditCardModalType = {
    onEditHandle: (data: UpdateCardType) => void
    card: CardType
}

export const EditCardModal = ({onEditHandle, card, ...props}: EditCardModalType) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const {register, handleSubmit, reset, setValue} = useForm<UpdateCardType>()

    const onSubmit: SubmitHandler<UpdateCardType> = (data: UpdateCardType) => {
        onEditHandle({...data, _id: card._id})
        handleClose()
    }

    return (
        <>
            <IconButton color={'secondary'} onClick={handleOpen}>
                <BorderColorIcon style={{marginRight: '4px'}}/>
            </IconButton>

            <BasicModal open={open} handleClose={handleClose}>
                <Typography variant="h5" component="h2">
                    EDIT CARD
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {card.questionImg && card.questionImg !== '' ?
                    <>
                        <UploadImage buttonName={'Update question image'} setValue={setValue} cover={card.questionImg}
                                     valueId={'questionImg'}/>
                        <UploadImage buttonName={'Update answer image'} setValue={setValue} cover={card.answerImg}
                                     valueId={'answerImg'}/>
                    </>
                        :
                        <>
                            <TextField
                                sx={{mt: 2, width: '100%'}}
                                id="card-question"
                                label="Edit card's question"
                                variant="standard"
                                margin="normal"
                                defaultValue={card.question}
                                {...register('question')}
                            />
                            <TextField
                                sx={{mt: 2, width: '100%'}}
                                id="card-answer"
                                label="Edit card's answer"
                                variant="standard"
                                margin="normal"
                                defaultValue={card.answer}
                                {...register('answer')}
                            />
                        </>
                    }
                    <Typography sx={{mt: 2}} display={'flex'} justifyContent={'space-between'}>
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
