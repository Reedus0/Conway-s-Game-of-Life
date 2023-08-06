import { Cell } from "../models/Cell"
import { Field } from "../models/Field"

export const template = () => null


export const createCell = (event: any, field: Field) => {

    const gameElement = document.getElementById('game') as HTMLElement

    const matrix = new WebKitCSSMatrix((window.getComputedStyle(gameElement)).transform)
    const scale = matrix['a']

    console.log(scale)

    const offsetX = Number(window.getComputedStyle(gameElement).left.split('px')[0])
    const offsetY = Number(window.getComputedStyle(gameElement).top.split('px')[0])

    const cellLeft: number = event.x - offsetX
    const cellTop: number = event.y - offsetY

    const cellX = Math.floor(cellLeft / 20)
    const cellY = Math.floor(cellTop / 20)

    const newCell = new Cell(cellX, cellY)
    newCell.setActive(true)

    return field.addCell(newCell)
}

export const deleteCell = (element: HTMLElement, field: Field) => {

    const cellTop: number = (element?.style['top'].split('px')[0] as any) || 0
    const cellLeft: number = (element?.style['left'].split('px')[0] as any) || 0

    const cellX = cellLeft / 20
    const cellY = cellTop / 20

    return field.deleteCell(cellX, cellY)
}