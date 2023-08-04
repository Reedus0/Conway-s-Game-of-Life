import { Cell } from "../models/Cell"
import { Field } from "../models/Field"

export const template = () => null

export const getCellFromHTML = (element: HTMLElement, field: Field): Cell => {
    const cellTop: number = (element?.style['top'].split('px')[0] as any) || 0
    const cellLeft: number = (element?.style['left'].split('px')[0] as any) || 0

    const cellX = cellLeft / 20
    const cellY = cellTop / 20

    return field.getCell(cellX, cellY)
}

export const createCell = (element: HTMLElement, field: Field) => {
    const cellTop: number = (element?.style['top'].split('px')[0] as any) || 0
    const cellLeft: number = (element?.style['left'].split('px')[0] as any) || 0

    const cellX = cellLeft / 20
    const cellY = cellTop / 20

    const newCell = new Cell(cellX, cellY)
    newCell.setActive(true)

    return field.addCell(newCell)
}