import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { appReducer } from 'n1-main/m2-bll/appSlice'
import { authReducer } from 'n1-main/m2-bll/authSlice'
import { cardsReducer } from 'n1-main/m2-bll/cardsSlice'
import { learnReducer } from 'n1-main/m2-bll/learnSlice'
import { packReducer } from 'n1-main/m2-bll/packSlice'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  cards: cardsReducer,
  packs: packReducer,
  learn: learnReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

//types
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
export type AppActionTypes = AnyAction
export type RootState = ReturnType<typeof store.getState>
