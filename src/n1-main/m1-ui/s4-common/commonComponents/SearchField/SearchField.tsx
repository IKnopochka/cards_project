import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import { useDebounce } from 'n1-main/m1-ui/s4-common/hooks/useDebounce'
import { useAppSelector } from 'n1-main/m3-dal/store'
import { appStatusSelector } from 'n1-main/m1-ui/s4-common/selectors/appSelectors'

import s from 'n1-main/m1-ui/s4-common/commonComponents/SearchField/SearchField.module.scss'

export function SearchField({ onSearchName, searchValue, classname, ...props }: SearchFieldTypes) {
  const [value, setValue] = useState<string>(searchValue)
  const debouncedValue = useDebounce<string>(value, 750)
  const appStatus = useAppSelector(appStatusSelector)

  useEffect(() => {
    onSearchName(value)
  }, [debouncedValue])

  useEffect(() => {
    if (value !== searchValue) setValue(searchValue)
  }, [searchValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className={classname}>
      <span className={s.text}>Search</span>
      <Paper component="form" elevation={0} sx={{ background: 'transparent' }} className={s.paper}>
        <SearchIcon color={'disabled'} sx={{ width: '18px', ml: '5px' }} />
        <InputBase
          className={s.input}
          placeholder="Search by question"
          inputProps={{ 'aria-label': 'search by question' }}
          onChange={handleChange}
          value={value}
          disabled={appStatus === 'loading'}
        />
      </Paper>
    </div>
  )
}

type SearchFieldTypes = {
  classname?: string
  onSearchName: (value: string) => void
  searchValue: string
  searchParams: URLSearchParams
}
