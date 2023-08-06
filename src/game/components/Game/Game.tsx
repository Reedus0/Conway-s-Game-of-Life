import React, { FC, useReducer, useState } from 'react'
import { MainGame } from '../../models/MainGame';
import GameHandler from '../GameHandler/GameHandler';
import './Game.scss'
import { getGameCords } from '../../utils';

interface GameProps {

}

const Game: FC<GameProps> = ({ }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [mainGame, setMainGame] = useState<MainGame>(
        new MainGame()
    );

    let isMoving: boolean = false

    let firstCordsX: number = 0
    let firstCordsY: number = 0

    const onMoveMouse = (e: any) => {
        if (isMoving && isPlaying) {
            const { currentX, currentY, gameElement } = getGameCords()
            const moveCoefficient: number = 0.7;
            gameElement.style.left = currentX + ((e.screenX - firstCordsX) * moveCoefficient) + 'px'
            gameElement.style.top = currentY + ((e.screenY - firstCordsY) * moveCoefficient) + 'px'
            firstCordsX = e.screenX
            firstCordsY = e.screenY
        }
    }


    const onMoveTouch = (e: any) => {
        if (isMoving && isPlaying) {
            const { currentX, currentY, gameElement } = getGameCords()
            const moveCoefficient: number = 1;
            gameElement.style.left = currentX + ((e['changedTouches'][0].screenX - firstCordsX) * moveCoefficient) + 'px'
            gameElement.style.top = currentY + ((e['changedTouches'][0].screenY - firstCordsY) * moveCoefficient) + 'px'
            firstCordsX = e['changedTouches'][0].screenX
            firstCordsY = e['changedTouches'][0].screenY
        }
    }

    const onDown = (e: any) => {
        firstCordsX = e.screenX
        firstCordsY = e.screenY
        isMoving = true
    }

    const onUp = (e: any) => {
        firstCordsX = 0
        firstCordsY = 0
        isMoving = false
    }


    document.onmousemove = onMoveMouse
    document.onmousedown = onDown
    document.onmouseup = onUp

    document.ontouchmove = onMoveTouch
    document.ontouchstart = onDown
    document.ontouchend = onDown


    // document.onwheel = (e: any) => {
    //     const drawerElement: HTMLElement = document.querySelector('.game')!
    //     const matrix = new WebKitCSSMatrix((window.getComputedStyle(drawerElement)).transform)
    //     let editorCurrentScale = matrix['a']
    //     if (e.deltaY < 0 && editorCurrentScale < 3.2) {
    //         editorCurrentScale += 0.2
    //     } else if (e.deltaY > 0 && editorCurrentScale > 0.2) {
    //         editorCurrentScale -= 0.2
    //     }
    //     drawerElement.style.transform = `scale(${editorCurrentScale})`
    // }

    return (
        <div className='game'>
            <div className='game__inner' id='game'>
                <GameHandler mainGame={mainGame} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            </div>
        </div>
    )
}

export default Game;