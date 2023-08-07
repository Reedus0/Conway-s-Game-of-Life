import { Cell } from "./Cell"
import { Field } from "./Field"

export class MainGame {
    private cellsField: Field = new Field()
    private nextDayCellsField: Field = new Field()

    public calcultateNextDay(): void {
        for (let i = 0; i < this.cellsField.getCells().length; i++) {
            const cellNeigbours = this.cellsField.getAllCellNeighbours(this.cellsField.getCell(
                this.cellsField.getCells()[i]['x'],
                this.cellsField.getCells()[i]['y'],
            ))
            const activeCellNeigbours = cellNeigbours.filter((cell: Cell) => cell.getActive())

            if ((activeCellNeigbours.length < 2 || activeCellNeigbours.length > 3) && activeCellNeigbours.length !== 0) {
                const newCell = this.nextDayCellsField.addCell(new Cell(
                    this.cellsField.getCells()[i]['x'],
                    this.cellsField.getCells()[i]['y']
                ))
                newCell.setActive(false)
            } else if (activeCellNeigbours.length === 3) {
                const newCell = this.nextDayCellsField.addCell(new Cell(
                    this.cellsField.getCells()[i]['x'],
                    this.cellsField.getCells()[i]['y']
                ))
                newCell.setActive(true)
            } else if (activeCellNeigbours.length !== 0) {
                const newCell = this.nextDayCellsField.addCell(new Cell(
                    this.cellsField.getCells()[i]['x'],
                    this.cellsField.getCells()[i]['y']
                ))
                newCell.setActive(
                    this.cellsField.getCell(
                        this.cellsField.getCells()[i]['x'],
                        this.cellsField.getCells()[i]['y']
                    ).getActive()
                )
            }
        }
        this.nextDayCellsField.setCells(this.nextDayCellsField.getCells().filter((cell: Cell) => cell.getActive()))
        this.cellsField = this.nextDayCellsField
        this.nextDayCellsField = new Field()
    }
}