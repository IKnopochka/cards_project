import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

import { PATH } from 'n1-main/m1-ui/s4-common/app/Routes/AppRoutes'
import { AddNewCardType } from 'n1-main/m3-dal/cardsAPI'
import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { addNewCard, getCards } from 'n1-main/m2-bll/cardsSlice'
import { cardsSelector, isLoggedInSelector, packNameSelector, SearchField } from 'n1-main/m1-ui/s4-common'

import s from 'n2-features/f4-cards/Cards.module.scss'
import {CardsHeader} from "n2-features/f4-cards/CardsHeader/CardsHeader";
import {CardsTableHead} from "n2-features/f4-cards/c1-table/CardsTableHead";
import {CardsTableBody} from "n2-features/f4-cards/c1-table/CardsTableBody";

export const Cards = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(packNameSelector)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  //set params into URL
  const [searchParams, setSearchParams] = useSearchParams()
  //get Single Params From URL
  const searchValue = searchParams.get('cardQuestion')
  const sortCards = searchParams.get('sortCards')
  const cardsPack_id = searchParams.get('cardsPack_id')
  //to get params from URL after l2-question Mark
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  useEffect(() => {
    if (!isLoggedIn) return

    dispatch(getCards({ ...paramsFromUrl, cardsPack_id: cardsPack_id }))
  }, [searchParams, isLoggedIn])

  const onSearchNameDebounce = (value: string) => {
    setSearchParams({ ...paramsFromUrl, cardQuestion: value })
  }

  const setSortCards = (sortCards: string) => {
    setSearchParams({
      ...paramsFromUrl,
      sortCards,
    })
  }

  const onAddNewCardHandler = (data: AddNewCardType) => {
    dispatch(addNewCard({ ...data, cardsPack_id }, { ...paramsFromUrl, cardsPack_id }))
  }

  if (cardsPack_id === null) return <Navigate to={PATH.PACKS} />

  return (
    <>
      <CardsHeader onAddNewCard={onAddNewCardHandler} packId={cardsPack_id} />
      <TableContainer component={Paper}>
        <SearchField
          onSearchName={onSearchNameDebounce}
          searchValue={searchValue ?? ''}
          searchParams={searchParams}
        />
        {cards?.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <CardsTableHead setSort={setSortCards} sort={sortCards ?? '0updated'} />
            <CardsTableBody />
          </Table>
        ) : (
          <div className={s.container}>
            <span className={s.message}>{'Nothing was found. Change your search parameters'}</span>
          </div>
        )}
      </TableContainer>
    </>
  )
}
