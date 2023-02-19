import React from 'react'
import downSvg from '../icons/sortDown.svg'
import upSvg from '../icons/sortUp.svg'
import neutralSvg from '../icons/sortBothSides.svg'

// добавить в проект иконки и импортировать
const downIcon = downSvg
const upIcon = upSvg
const noneIcon = neutralSvg

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...// исправить
    switch (sort) {
        case down:
            return up
        case up:
            return ''
        default:
            return down
    }
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {/*сделать иконку*/}
            <img
                id={id + '-icon-' + sort}
                src={icon}
                style={{
                    width: '12px',
                    height: '12px'
                }}
            />
        </span>
    )
}

export default SuperSort
