import React, {useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel';
import {SubmitHandler, useForm} from 'react-hook-form'
import {BasicModal} from 'n1-main/m1-ui/common/Modals/BasicModal'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {UploadImage} from 'n1-main/m1-ui/common/UploadImage/UploadImage'
import {SuperButton} from "n1-main/m1-ui/common/index";
import {AddNewCardType} from "n1-main/m3-dal/cardsAPI";
import MenuItem from "@mui/material/MenuItem";

type AddCardModalPropsType = {
    onAddHandle: (data: AddNewCardType) => void
}

const options = ['Text', 'Image']


export const AddCardModal = ({onAddHandle, ...props}: AddCardModalPropsType) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const {
        setValue,
        register,
        handleSubmit,
        reset

    } = useForm<any>({
        defaultValues: {
            selectQuestion: 'Text',
        }
    })

    const onSubmit: SubmitHandler<AddNewCardType> = (data: AddNewCardType) => {
        console.log(data)

        onAddHandle(data)
        handleClose()
    }

    const [format, setFormat] = React.useState('Text');

    const handleChange = (event: SelectChangeEvent) => {
        setFormat(event.target.value);
    };


    return (
        <div>
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
            <BasicModal open={open} handleClose={handleClose}>
                <Typography variant="h5" component="h2">
                    ADD NEW CARD
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputLabel>Choose format</InputLabel>
                    <Select sx={{width: '100%', height: '36px'}} value={format} onChange={handleChange}>
                        {options.map((option, index) => (
                            <MenuItem key={index} sx={{width: '347px', height: '36px'}} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    {format === 'Text' && (<>
                            <TextField
                                sx={{mt: 2, width: '100%'}}
                                id="question"
                                label="Enter question"
                                variant="standard"
                                margin="normal"
                                {...register('question')}
                            />
                            <TextField
                                sx={{mt: 2, width: '100%'}}
                                id="answer"
                                label="Enter answer"
                                variant="standard"
                                margin="normal"
                                {...register('answer')}
                            />
                        </>
                    )}
                    {format === 'Image' && (
                        <>
                            <UploadImage setValue={setValue} valueId={'questionImg'}
                                         buttonName={'Upload Question picture'}/>
                            <UploadImage setValue={setValue} valueId={'answerImg'}
                                         buttonName={'Upload Answer picture'}/>
                        </>
                    )}
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
        </div>
    )
}