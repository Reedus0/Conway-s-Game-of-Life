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
                // <>
                //     {window.innerWidth > cell['x'] * 20 && window.innerHeight > cell['y'] * 20 ? <GameCell x={cell['x']} y={cell['y']} test={test} active={test ? true : cell.getActive()} /> : <></>}
                // </>
                <GameCell x={cell['x']} y={cell['y']} test={test} active={test ? true : cell.getActive()} />
            )}
        </div>
    )
}

export default GameField;