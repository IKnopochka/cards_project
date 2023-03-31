import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { useLocation, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { getCards } from 'n1-main/m2-bll/cardsSlice'
import { setCurrentCard } from 'n1-main/m2-bll/learnSlice'
import {
  appStatusSelector,
  BackToPacksList,
  cardsSelector,
  getRandomCard,
  isLoggedInSelector,
  LinearProgress,
  packNameSelector,
  showAnswerSelector,
} from 'n1-main/m1-ui/s4-common'

import { Answer } from 'n2-features/f5-learn/l1-answer/Answer'
import s from 'n2-features/f5-learn/Learn.module.scss'
import { Question } from 'n2-features/f5-learn/l2-question/Question'

export const Learn = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(packNameSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const showAnswer = useAppSelector(showAnswerSelector)
  const appStatus = useAppSelector(appStatusSelector)

  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))
  const { packId } = useParams<{ packId: string }>()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getCards({ ...paramsFromUrl, cardsPack_id: packId ?? '' }))
  }, [packId, isLoggedIn])

  useEffect(() => {
    if (cards && cards.length > 0) {
      dispatch(setCurrentCard(getRandomCard(cards)))
    }
  }, [isLoggedIn, packId, cards])

  if (appStatus === 'loading') {
    return <LinearProgress />
  }

  return (
    <>
      <BackToPacksList />
      <div className={s.questionContainer}>
        <div className={s.title}>Learn &quot;{packName}&quot;</div>
        <Paper elevation={3}>
          <Question />
          {showAnswer && <Answer />}
        </Paper>
      </div>
    </>
  )
}
