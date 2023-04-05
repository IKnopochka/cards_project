import React, {useState} from 'react'
import {CardType, UpdateCardType} from 'n1-main/m3-dal/cardsAPI'
import {EditCardModal} from "n1-main/m1-ui/common/Modals/CardsModals/EditCardModal";
import {useAppDispatch} from "n1-main/m3-dal/store";
import {deleteCard, updateCard} from "n1-main/m2-bll/cardsSlice";
import {useLocation} from "react-router-dom";
import {DeleteCardModal} from "n1-main/m1-ui/common/Modals/CardsModals/DeleteCardModal";

type ActionsPropsType = {
    card: CardType
    cardsPackId: string
}

export const ActionsForCards = ({card, cardsPackId, ...props}: ActionsPropsType) => {
    const dispatch = useAppDispatch()
    const {search} = useLocation()
    const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

    const deleteCardModalHandle = (cardId: string) => {
        dispatch(deleteCard(cardId, {...paramsFromUrl, cardsPack_id: cardsPackId}))
    }

    const editCardModalHandle = (data: UpdateCardType) => {
        dispatch(updateCard(data, {...paramsFromUrl, cardsPack_id: cardsPackId}))
    }

    return (
        <div style={{marginRight: '14px'}}>
            <DeleteCardModal id={card._id} name={card.questionImg ?? card.questionImg} onDeleteHandle={deleteCardModalHandle}/>
            <EditCardModal onEditHandle={editCardModalHandle} card={card}/>
        </div>
    )
}
