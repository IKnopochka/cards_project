import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { getCards } from 'n1-main/m2-bll/cardsSlice'
import { setCurrentCard } from 'n1-main/m2-bll/learnSlice'


import { Answer } from 'n2-features/f5-learn/l1-answer/Answer'
import s from 'n2-features/f5-learn/Learn.module.scss'
import { Question } from 'n2-features/f5-learn/l2-question/Question'
import {
  appLoadingStatusSelector,
  cardsSelector,
  isLoggedInSelector,
  packNameSelector, showAnswerSelector
} from "n1-main/m1-ui/common/selectors/selectors";
import { LinearProgress, SuperButton} from "n1-main/m1-ui/common";
import {getRandomCard} from "n1-main/m1-ui/utils";
import {PATH} from "n1-main/m1-ui/routes/AppRoutes";

export const Learn = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(packNameSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const showAnswer = useAppSelector(showAnswerSelector)
  const appStatus = useAppSelector(appLoadingStatusSelector)

  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))
  const { packId } = useParams<{ packId: string }>()
  const navigate = useNavigate()

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
  const buttonBackHandler = () => {
    navigate(PATH.CARDS)
  }
  return (
    <>
      <SuperButton onClick={buttonBackHandler} style={{
        letterSpacing: '0.01em',
        fontSize: '16px',
        width: '175px',
      }}>Back to cards</SuperButton>
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
