import React from 'react'

import {HeaderType} from "n2-features/f3-packs/p1-table/PacksTableHead";
import {HeadTable} from "n1-main/m1-ui/common";

export type CardData = {
  question: string
  answer: string
  updated: string
  grade: string
  empty: string
}

const headerCardsTable: HeaderType<CardData>[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'grade', label: 'Grade' },
  { id: 'empty', label: '' },
]

type CardsTableHeadType = {
  setSort: (sortCards: string) => any
  sort: string
}

export const CardsTableHead = (props: CardsTableHeadType) => {
  const sortBy = props.sort ? props.sort.substring(1) : 'update'
  const sortOrder = props.sort ? props.sort[0] : '0'

  return (
    <>
      <HeadTable
        header={headerCardsTable}
        setSort={props.setSort}
        sortOrderStart={sortOrder}
        sortBy={sortBy}
      />
    </>
  )
}
