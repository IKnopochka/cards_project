import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

import {
  AddNewCardType,
  cardsAPI,
  CardsReturnType,
  GetCardsType,
  UpdateCardGradeReturnType,
  UpdateCardGradeType,
  UpdateCardType,
} from 'n1-main/m3-dal/cardsAPI'
import { AppDispatch, RootState } from 'n1-main/m3-dal/store'

import { setAppStatus } from 'n1-main/m2-bll/appSlice'
import { setCurrentCard, setShowAnswer } from 'n1-main/m2-bll/learnSlice'
import {errorUtils, getRandomCard} from "n1-main/m1-ui/utils";

const initialState = {
  cardsData: {} as CardsReturnType,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    setCards: (state, action: PayloadAction<{ cardsData: CardsReturnType }>) => {
      state.cardsData = action.payload.cardsData
    },
    setUpdateGrade: (
      state,
      { payload }: PayloadAction<{ updatedGrade: UpdateCardGradeReturnType }>
    ) => {
      const card = state.cardsData.cards.find(card => card._id === payload.updatedGrade.card_id)

      if (card) {
        card.grade = payload.updatedGrade.grade
        card.shots = payload.updatedGrade.shots
      }

      return state
    },
  },
})

export const { setCards, setUpdateGrade } = cardsSlice.actions

export const cardsReducer = cardsSlice.reducer

//thunkCreators
export const getCards = (attributes: GetCardsType) => async (dispatch: Dispatch) => {
    console.log(attributes)
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const result = await cardsAPI.getAllCards(attributes)

    dispatch(setCards({ cardsData: result.data }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
}

export const addNewCard =
  (data: AddNewCardType, attributes: GetCardsType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.addNewCard(data)

      dispatch(getCards(attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

export const deleteCard =
  (cardId: string, attributes: GetCardsType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.deleteCard(cardId)

      dispatch(getCards(attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }
export const updateCard =
  (data: UpdateCardType, attributes: GetCardsType) => async (dispatch: AppDispatch) => {
    console.log(attributes)
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.updateCard(data)

      dispatch(getCards(attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

export const updateCardGrade =
  (data: UpdateCardGradeType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await cardsAPI.updateCardGrade(data)

      dispatch(setUpdateGrade(res.data))

      const cards = getState().cards.cardsData.cards

      dispatch(setCurrentCard(getRandomCard(cards)))
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(setShowAnswer({ showAnswer: false }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

//types
type InitialStateType = typeof initialState
