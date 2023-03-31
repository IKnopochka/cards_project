import { RootState } from 'n1-main/m3-dal/store'

export const packsSelector = (state: RootState) => state.packs.packsData.cardPacks
export const packsTotalCountSelector = (state: RootState) =>
  state.packs.packsData.cardPacksTotalCount
export const maxCardsValueSelector = (state: RootState) => state.packs.packsData.maxCardsCount
