import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
import GameField from '../GameField/GameField';
import { MainGame } from '../../models/MainGame';
import { createCell } from '../../utils';
import { Cell } from '../../models/Cell';

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
        createCell(e, mainGame['cellsField'])
        forceUpdate()
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
            <button onClick={() => nextStep()}>Step</button>
            <input value={playSpeed} onChange={(e: any) => setPlaySpeed(e.target.value)} />
            <GameField field={mainGame['cellsField']} test={false} />
        </div>
    )
}

export default GameHandler;