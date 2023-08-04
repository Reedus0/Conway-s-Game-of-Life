import { Cell } from "./Cell"
import { Field } from "./Field"

export class MainGame {
    private size: number = 100

    private cellsField: Field = new Field(this.size)
    private nextDayCellsField: Field = new Field(this.size)

    private chachedCellsField: Field = new Field(0)

    constructor(size: number) {
        this.size = size
        this.cellsField = new Field(this.size)
        this.nextDayCellsField = new Field(this.size)
    }

    public calcultateNextDay(): void {
        let cellsToChache: Cell[] = []
        let currentField = this.cellsField
        if (this.chachedCellsField.getCells().length !== 0) currentField = this.chachedCellsField
        this.chachedCellsField = new Field(0)
        for (let i = 0; i < currentField.getCells().length; i++) {
            const cellNeigbours = this.cellsField.getAllCellNeighbours(this.cellsField.getCell(
                currentField.getCells()[i]['x'],
                currentField.getCells()[i]['y'],
            ))
            const activeCellNeigbours = cellNeigbours.filter((cell: Cell) => cell.getActive())
            if ((activeCellNeigbours.length < 2 || activeCellNeigbours.length > 3) && activeCellNeigbours.length !== 0) {
                const newCell = this.nextDayCellsField.getCell(
                    currentField.getCells()[i]['x'],
                    currentField.getCells()[i]['y']
                )
                newCell.setActive(false)
            } else if (activeCellNeigbours.length === 3) {
                const newCell = this.nextDayCellsField.getCell(
                    currentField.getCells()[i]['x'],
                    currentField.getCells()[i]['y']
                )
                newCell.setActive(true)
                cellsToChache.push(newCell)
            } else if (activeCellNeigbours.length !== 0) {
                const newCell = this.nextDayCellsField.getCell(
                    currentField.getCells()[i]['x'],
                    currentField.getCells()[i]['y']
                )
                newCell.setActive(currentField.getCell(
                    currentField.getCells()[i]['x'],
                    currentField.getCells()[i]['y']
                ).getActive()
                )
                newCell.setActive(this.cellsField.getCell(
                    currentField.getCells()[i]['x'],
                    currentField.getCells()[i]['y']
                ).getActive())
                cellsToChache.push(newCell)
            }
        }
        for (const cell of cellsToChache) {
            this.chacheCell(cell)
        }
        this.cellsField = this.nextDayCellsField
        this.nextDayCellsField = new Field(this.size)
        console.log(this.chachedCellsField)
    }

    private chacheCell(cell: Cell) {
        const cells: Cell[] = this.cellsField.getAllCellNeighbours(cell)
        for (let i = 0; i < cells.length; i++) {
            if (this.chachedCellsField.getCell(cells[i]['x'], cells[i]['y']) === undefined) {
                this.chachedCellsField.addCell(cells[i])
            }
        }

    }
}