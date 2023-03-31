import { RootState } from 'n1-main/m3-dal/store'

export const appStatusSelector = (state: RootState) => state.app.status
