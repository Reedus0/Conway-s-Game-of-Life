import React, { FC, useReducer} from 'react'
import GameField from '../GameField/GameField';
import { MainGame } from '../../models/MainGame';
import { createCell, deleteCell } from '../../utils';
import GamePanel from '../GamePanel/GamePanel';

import './GameHandler.scss'

interface GameHandlerProps {
    mainGame: MainGame
    isPlaying: boolean
    setIsPlaying: Function
}

const GameHandler: FC<GameHandlerProps> = ({ mainGame, isPlaying, setIsPlaying }) => {

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
            <GamePanel mainGame={mainGame} forceUpdate={forceUpdate} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <GameField field={mainGame['cellsField']} test={false} />
        </div>
    )
}

export default GameHandler;