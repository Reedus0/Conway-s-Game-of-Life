import { Cell } from "./Cell";

export class Field {
    private size: number = 10
    private cells: Cell[] = []

    constructor(size: number) {
        this.size = size
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.cells.push(new Cell(i, j))
            }
        }
    }

    public setCells(cells: Cell[]): void {
        this.cells = cells
    }

    public getCells(): Cell[] {
        return this.cells
    }

    public addCell(cell: Cell): Cell {
        this.cells.push(cell)
        return cell
    }

    public getCell(x: number, y: number): Cell {
        return this.cells.filter((cell: Cell) => cell['x'] === x && cell['y'] === y)[0]
    }

    public deleteCell(x: number, y: number): void {
        this.cells = this.cells.filter((cell: Cell) => cell['x'] !== x && cell['y'] !== y)
    }

    public getAllCellNeighbours(cell: Cell): Cell[] {
        const result: Cell[] = []
        const cellPosibleNeighbours = [
            [cell['x'] - 1, cell['y'] + 1],
            [cell['x'], cell['y'] + 1],
            [cell['x'] + 1, cell['y'] + 1],
            [cell['x'] + 1, cell['y']],
            [cell['x'] + 1, cell['y'] - 1],
            [cell['x'], cell['y'] - 1],
            [cell['x'] - 1, cell['y'] - 1],
            [cell['x'] - 1, cell['y']],
        ]
        for (let i = 0; i < cellPosibleNeighbours.length; i++) {
            const currentCell = this.getCell(cellPosibleNeighbours[i][0], cellPosibleNeighbours[i][1])
            if (currentCell !== undefined) {
                result.push(currentCell)
            }
        }
        return result
    }
}