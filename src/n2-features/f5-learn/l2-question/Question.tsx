import React from 'react'

import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { setShowAnswer } from 'n1-main/m2-bll/learnSlice'

import s from 'n2-features/f5-learn/l2-question/Question.module.scss'
import {questionSelector, shotsSelector, showAnswerSelector} from "n1-main/m1-ui/common/selectors/selectors";
import {SuperButton} from "n1-main/m1-ui/common";

export const Question = () => {
  const showAnswer = useAppSelector(showAnswerSelector)
  const question = useAppSelector(questionSelector)
  const shots = useAppSelector(shotsSelector)

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setShowAnswer({ showAnswer: true }))
  }

  return (
    <div className={s.questionContainer}>
      <div className={s.question}>
        <b>Question: </b>
        {question}
      </div>
      <span
        className={s.numberOfAnswer}
      >{`Number of attempts to answer the question: ${shots}`}</span>
      {!showAnswer && (
        <SuperButton className={s.button} onClick={onClickHandler}>
          Show answer
        </SuperButton>
      )}
    </div>
  )
}
