import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
import GameField from '../GameField/GameField';
import { MainGame } from '../../models/MainGame';
import { getCellFromHTML } from '../../utils';

interface GameHandlerProps {
    mainGame: MainGame
}

const GameHandler: FC<GameHandlerProps> = ({ mainGame }) => {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playSpeed, setPlaySpeed] = useState<number>(1000);

    let playRef = useRef(null)

    const nextStep = () => {
        mainGame.calcultateNextDay()
        forceUpdate()
    }

    document.onclick = (e: any) => {
        if (e.target.classList.contains('game-cell')) {
            const currentCell = getCellFromHTML(e.target, mainGame['cellsField'])
            currentCell.setActive(!currentCell.getActive())
            forceUpdate()
        }
    }

    useEffect(() => {
        if (isPlaying) {
            (playRef.current as any) = setInterval(() => nextStep(), playSpeed);
        } else {
            clearInterval((playRef.current as any));
        }
    }, [isPlaying])

    return (
        <div className='game-handler'>
            <button onClick={() => setIsPlaying(!isPlaying)}>Start</button>
            <input value={playSpeed} onChange={(e: any) => setPlaySpeed(e.target.value)} />
            <GameField field={mainGame['cellsField']} test={false} />
            <GameField field={mainGame['chachedCellsField']} test={true} />
        </div>
    )
}

export default GameHandler;