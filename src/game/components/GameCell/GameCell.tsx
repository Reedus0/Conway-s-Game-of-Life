import React, { FC, memo } from 'react'

import './GameCell.scss'

interface GameCellProps {
    x: number
    y: number
    active: boolean
    test: boolean
}

const GameCell: FC<GameCellProps> = ({ x, y, test, active }) => {
    return (
        <span className={['game-cell', active ? '_active' : '', test ? '_test' : ''].join(' ')}
            style={{ left: x * 20, top: y * 20 }}
        ></span>
    )
}

export default memo(GameCell);