import { Cell } from "./Cell";

export class Field {
    private cells: Cell[] = []

    public setCells(cells: Cell[]): Cell[] {
        this.cells = cells
        return this.cells
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

    public deleteCell(x: number, y: number): Cell {
        this.cells = this.cells.filter((cell: Cell) => cell['x'] !== x && cell['y'] !== y)
        return this.cells.filter((cell: Cell) => cell['x'] === x && cell['y'] === y)[0]
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
            } else {
                if (cell.getActive()) {
                    this.addCell(new Cell(cellPosibleNeighbours[i][0], cellPosibleNeighbours[i][1]))
                }
            }
        }
        return result
    }
}