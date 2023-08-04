import React, { FC, useState } from 'react'
import { MainGame } from '../../models/MainGame';

import './Game.scss'
import GameHandler from '../GameHandler/GameHandler';

interface GameProps {

}

const Game: FC<GameProps> = ({ }) => {

    const [mainGame, setMainGame] = useState<MainGame>(
        new MainGame(100)
    );

    let isMoving: boolean = false

    let firstCordsX: number = 0
    let firstCordsY: number = 0

    document.onmousemove = (e: any) => {
        if (isMoving) {
            const gameElement: HTMLElement = document.querySelector('.game')!
            const currentX = Number(window.getComputedStyle(gameElement).left.split('px')[0])
            const currentY = Number(window.getComputedStyle(gameElement).top.split('px')[0])
            const moveCoefficient: number = 0.7;
            gameElement.style.left = currentX + ((e.screenX - firstCordsX) * moveCoefficient) + 'px'
            gameElement.style.top = currentY + ((e.screenY - firstCordsY) * moveCoefficient) + 'px'
            firstCordsX = e.screenX
            firstCordsY = e.screenY
        }
    }
    
    document.onmousedown = (e: any) => {
        firstCordsX = e.screenX
        firstCordsY = e.screenY
        isMoving = true
    }

    document.onmouseup = (e: any) => {
        firstCordsX = 0
        firstCordsY = 0
        isMoving = false
    }

    document.onwheel = (e: any) => {
        const drawerElement: HTMLElement = document.querySelector('.game')!
        const matrix = new WebKitCSSMatrix((window.getComputedStyle(drawerElement)).transform)
        let editorCurrentScale = matrix['a']
        if (e.deltaY < 0 && editorCurrentScale < 3.2) {
            editorCurrentScale += 0.2
        } else if (e.deltaY > 0 && editorCurrentScale > 0.2) {
            editorCurrentScale -= 0.2
        }
        drawerElement.style.transform = `scale(${editorCurrentScale})`
    }




    return (
        <div className='game'>
            <GameHandler mainGame={mainGame} />
        </div>
    )
}

export default Game;