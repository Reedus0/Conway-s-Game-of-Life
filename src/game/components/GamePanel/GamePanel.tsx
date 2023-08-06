import React, { FC, useEffect, useRef, useState } from 'react'

import './GamePanel.scss'
import { MainGame } from '../../models/MainGame'

interface GamePanelProps {
    mainGame: MainGame
    forceUpdate: Function
}

const GamePanel: FC<GamePanelProps> = ({ mainGame, forceUpdate }) => {

    let playRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playSpeed, setPlaySpeed] = useState<number>(1000);

    const nextStep = () => {
        mainGame.calcultateNextDay()
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
        <div className='game-panel'>
            <button onClick={() => setIsPlaying(!isPlaying)}>Start</button>
            <button onClick={() => nextStep()}>Step</button>
            <input value={playSpeed} onChange={(e: any) => setPlaySpeed(e.target.value)} />
        </div>
    )
}

export default GamePanel;