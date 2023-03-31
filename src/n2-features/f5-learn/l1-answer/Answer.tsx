import React, { useEffect } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { updateCardGrade } from 'n1-main/m2-bll/cardsSlice'
import { setGrade } from 'n1-main/m2-bll/learnSlice'
import { answerSelector, card_idSelector, gradeSelector, SuperButton } from 'n1-main/m1-ui/s4-common'

import s from 'n2-features/f5-learn/l1-answer/Answer.module.scss'

export const Answer = () => {
  const answer = useAppSelector(answerSelector)
  const grade = useAppSelector(gradeSelector)
  const card_id = useAppSelector(card_idSelector)
  const dispatch = useAppDispatch()
  const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

  useEffect(() => {
    dispatch(setGrade({ grade: 1 }))
  }, [])

  const onChangeGrade = (grade: number) => {
    dispatch(setGrade({ grade: grade + 1 }))
  }
  const onNextClickHandler = () => {
    dispatch(updateCardGrade({ grade, card_id }))
  }

  return (
    <div className={s.answerContainer}>
      <div className={s.answer}>
        <b>Answer: </b>
        {answer}
      </div>
      <FormControl>
        <span className={s.title}>Rate yourself:</span>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue={grade}
          name="radio-buttons-group"
        >
          {grades.map((grade, index) => {
            return (
              <FormControlLabel
                control={<Radio />}
                label={grade}
                key={index}
                value={index}
                onChange={() => onChangeGrade(index)}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
      <SuperButton className={s.button} onClick={onNextClickHandler}>
        Next
      </SuperButton>
    </div>
  )
}
