import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  error: null as null | string,
  status: 'idle' as StatusType,
  isInitialized: false
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: StatusType }>) => {
      state.status = action.payload.status
    },
    setInitialized(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value
    }
  }
})


export const { setAppError, setAppStatus, setInitialized} = appSlice.actions
export const appReducer = appSlice.reducer

//types
export type StatusType = 'loading' | 'idle' | 'succeeded'| 'failed'
type InitialStateType = typeof initialState
