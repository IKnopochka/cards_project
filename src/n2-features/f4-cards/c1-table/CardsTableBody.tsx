import React from 'react'

import { Skeleton } from '@mui/material'
import Rating from '@mui/material/Rating/Rating'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from 'n1-main/m3-dal/store'
import {appLoadingStatusSelector, cardsSelector, userIdSelector} from "n1-main/m1-ui/common/selectors/selectors";
import {ActionsForCards} from "n2-features/f4-cards/c2-actions/ActionsForCards";

export const CardsTableBody = () => {
  const cards = useAppSelector(cardsSelector)
  const appStatus = useAppSelector(appLoadingStatusSelector)
  const userId = useAppSelector(userIdSelector)
  const onStudyClick = () => {
    console.log('study')
  }

  return (
    <TableBody>
      {cards?.map(card => (
        <TableRow key={card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell style={{ width: '100px, height: 25px' }} component="th" scope="row">
            {card.questionImg ? (
              <img style={{ width: 100, height: 25 }} src={card.questionImg} />
            ) : (
              card.question
            )}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton height={40} /> : card.answer}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton height={40} /> : card.updated.substring(0, 10)}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? (
              <Skeleton height={40} />
            ) : (
              <Rating name="size-medium" value={card.grade} />
            )}
          </TableCell>
          {card.user_id === userId && (
            <TableCell align="left">
              {appStatus === 'loading' ? (
                <Skeleton height={40} />
              ) : (
                <ActionsForCards card={card} onStudyClick={onStudyClick} />
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
