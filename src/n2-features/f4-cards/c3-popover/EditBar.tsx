import React from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import {createTheme, ThemeProvider} from '@mui/material/styles'

import {useAppSelector} from "n1-main/m3-dal/store";
import {packDeckCoverSelector} from "n1-main/m1-ui/common/selectors/selectors";
import {ActionsForPack} from "n2-features/f3-packs/p2-actions/ActionsForPack";


export const EditBar = ({
                            packId,
                            packName,
                            cardsTotalCount,
                            packUserId,
                            ...props
                        }: EditBarType) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const packCoverImage = useAppSelector(packDeckCoverSelector)

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000',
            },
        },
    })

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <ThemeProvider theme={theme}>
            <IconButton aria-describedby={id} onClick={handleOpen} color={'primary'}>
                <MoreVertIcon style={{marginRight: '4px', marginTop: '5px'}}/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <ActionsForPack
                    packId={packId}
                    packName={packName}
                    totalCardsInPack={cardsTotalCount}
                    id={packUserId}
                    packCover={packCoverImage}
                    hasText
                />
            </Popover>
        </ThemeProvider>
    )
}

type EditBarType = {
    packId: string
    packName: string
    cardsTotalCount: number
    packUserId: string
}
