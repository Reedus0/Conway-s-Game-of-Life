import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
import GameField from '../GameField/GameField';
import { MainGame } from '../../models/MainGame';
import { createCell, deleteCell } from '../../utils';
import GamePanel from '../GamePanel/GamePanel';

interface GameHandlerProps {
    mainGame: MainGame
}

const GameHandler: FC<GameHandlerProps> = ({ mainGame }) => {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    document.onclick = (e: any) => {
        if (e.button === 0) {

            if (e.target.closest('.game-panel') === null && !e.target.classList.contains('game-cell')) {
                createCell(e, mainGame['cellsField'])
                forceUpdate()
            }
            if (e.target.classList.contains('game-cell')) {
                deleteCell(e.target, mainGame['cellsField'])
                forceUpdate()
            }
        }
    }

    return (
        <div className='game-handler'>
            <GamePanel mainGame={mainGame} forceUpdate={forceUpdate} />
            <GameField field={mainGame['cellsField']} test={false} />
        </div>
    )
}

export default GameHandler;