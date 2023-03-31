import React, { SyntheticEvent, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'

import { useAppSelector } from 'n1-main/m3-dal/store'
import { appStatusSelector } from 'n1-main/m1-ui/s4-common/index'

import s from 'n1-main/m1-ui/s4-common/app/FilterPanel/SuperRange/SuperRange.module.scss'

type SuperRangeType = {
  min: number
  max: number
  setToUrlCardValues: (min: number, max: number) => void
  maxValue: number
}

export const SuperRange = (props: SuperRangeType) => {
  const appStatus = useAppSelector(appStatusSelector)
  const [value1, setValue1] = useState(props.min)
  const [value2, setValue2] = useState(props.maxValue)

  const changeValues = (event: SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      setValue1(value[0])
      setValue2(value[1])
    } else {
      return setValue1(value)
    }
  }

  useEffect(() => {
    setValue1(props.min)
    if (props.max) {
      setValue2(props.max)
    } else {
      setValue2(props.maxValue)
    }
  }, [props.maxValue, props.min, props.max])

  const setValuesToUrl = () => {
    props.setToUrlCardValues(value1, value2)
  }

  return (
    <div className={s.wrapper}>
      <span className={s.number}>{value1}</span>
      <Slider
        sx={{
          color: '#366EFF',
          height: '5px',
          width: '155px',

          '& .MuiSlider-thumb': {
            height: 18,
            width: 18,
            border: 'solid 5px white',
            outline: 'solid 2px #366EFF',
          },
        }}
        onChange={changeValues}
        onChangeCommitted={setValuesToUrl}
        value={[value1, value2]}
        disabled={appStatus === 'loading'}
        max={props.maxValue}
      />
      <span className={s.number}>{value2}</span>
    </div>
  )
}
