import React, { FC, useEffect, useRef, useState } from 'react'

import './GamePanel.scss'
import { MainGame } from '../../models/MainGame'
import { createCell, deleteCell } from '../../utils'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { IThemes } from '../../../models/ITheme'

interface GamePanelProps {
    mainGame: MainGame
    forceUpdate: Function
    isPlaying: boolean
    setIsPlaying: Function
}

const GamePanel: FC<GamePanelProps> = ({ mainGame, forceUpdate, isPlaying, setIsPlaying }) => {

    let playRef = useRef(null)

    const [playSpeed, setPlaySpeed] = useState<number>(100);
    const { theme } = useTypedSelector(state => state.themes)
    const { setTheme } = useActions()

    const nextStep = () => {
        mainGame.calcultateNextDay()
        forceUpdate()
    }

    document.onclick = (e: any) => {
        if (!isPlaying) {
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

    useEffect(() => {
        if (isPlaying) {
            (playRef.current as any) = setInterval(() => nextStep(), playSpeed);
        } else {
            clearInterval((playRef.current as any));
        }
    }, [isPlaying])

    return (
        <div className='game-panel'>
            <div className='game-panel__inner'>
                <Link to='/' className='game-panel__logo'>
                    <img className='game-panel__img' src={require('./../../../img/logo.png')} />
                </Link>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className='game-panel__button'
                >
                    {!isPlaying ?
                        <img className='game-panel__img _play' src={require('./../../../img/play.png')} />
                        :
                        <img className='game-panel__img _pause' src={require('./../../../img/pause.png')} />
                    }
                </button>
                <button
                    onClick={() => setTheme(theme === IThemes.DARK ? IThemes.LIGHT : IThemes.DARK)}
                    className='game-panel__theme'
                >
                    <img className='game-panel__img' src={require('./../../../img/theme.png')} />
                </button>
            </div>
        </div>
    )
}

export default GamePanel;