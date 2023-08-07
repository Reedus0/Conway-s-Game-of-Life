import React, { FC } from 'react'
import { Cell } from '../../models/Cell'
import GameCell from '../GameCell/GameCell'
import { Field } from '../../models/Field'
import './GameField.scss'

interface GameFieldProps {
    field: Field
    test: boolean
}

const GameField: FC<GameFieldProps> = ({ field, test }) => {
    return (
        <div className={['game-field', test ? '_test' : ''].join(' ')}>
            {field.getCells().map((cell: Cell) =>
                <GameCell x={cell['x']} y={cell['y']} test={test} active={test ? true : cell.getActive()} />
            )}
        </div>
    )
}

export default GameField;