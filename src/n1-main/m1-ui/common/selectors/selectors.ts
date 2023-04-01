import {RootState, useAppSelector} from 'n1-main/m3-dal/store'

//app selectors
export const appLoadingStatusSelector = (state: RootState) => state.app.status
export const appIsInitializedSelector = (state: RootState) => state.app.isInitialized
export const appErrorSelector = (state: RootState) => state.app.error

//authSelectors
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn
export const userIdSelector = (state: RootState) => state.auth.profile._id
export const isCreateNewPasswordSelector = (state: RootState) => state.auth.isCreateNewPassword
export const isSendedEmailSelector = (state: RootState) => state.auth.isSendedEmail
export const userInfoSelector = (state: RootState) => state.auth.profile
export const avatarSelector = (state: RootState) => state.auth.profile.avatar
export const userNameSelector = (state: RootState) => state.auth.profile.name

//cards selectors
export const packNameSelector = (state: RootState) => state.cards.cardsData.packName
export const cardsSelector = (state: RootState) => state.cards.cardsData.cards
export const cardsTotalCountSelector = (state: RootState) => state.cards.cardsData.cardsTotalCount
export const packUserIdSelector = (state: RootState) => state.cards.cardsData.packUserId
export const packDeckCoverSelector = (state: RootState) => state.cards.cardsData.packDeckCover

//learn selectors
export const showAnswerSelector = (state: RootState) => state.learn.showAnswer
export const questionSelector = (state: RootState) => state.learn.currentCard.question
export const shotsSelector = (state: RootState) => state.learn.currentCard.shots
export const gradeSelector = (state: RootState) => state.learn.currentCard.grade
export const answerSelector = (state: RootState) => state.learn.currentCard.answer
export const card_idSelector = (state: RootState) => state.learn.currentCard._id

//pack selectors
export const packsSelector = (state: RootState) => state.packs.packsData.cardPacks
export const packsTotalCountSelector = (state: RootState) =>
    state.packs.packsData.cardPacksTotalCount
export const maxCardsValueSelector = (state: RootState) => state.packs.packsData.maxCardsCount
