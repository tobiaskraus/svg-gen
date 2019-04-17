import { Point } from './model/types';

interface PointsGridOptions {
    minX: number;   // caution: x of points can be smaller than minX when randomDeltaX > 0 and pointsOnLeftEdge = false
    minY: number;   // caution: value can be below (see explanation above)
    maxX: number;   // caution: value can be above (see explanation above)
    maxY: number;   // caution: value can be above (see explanation above)
    cols: number;
    rows: number;
    randomDeltaX?: number;
    randomDeltaY?: number;
    pointsOnTopEdge?: boolean;
    pointsOnRightEdge?: boolean;
    pointsOnBottomEdge?: boolean;
    pointsOnLeftEdge?: boolean;
}

const PointsGridOptionsDefault: PointsGridOptions = {
    minX: 0,
    minY: 0,
    maxX: 100,
    maxY: 100,
    cols: 5,
    rows: 5,
}

export class PointsGrid {

    private options: PointsGridOptions;
    
    pointRows: Point[][] = []; // top to bottom

    constructor (
        options: Partial<PointsGridOptions>
    ) {
        // merge options with default values
        this.options = {...PointsGridOptionsDefault, ...options};
    }

    generate () {
        const deltaX = (this.options.maxX - this.options.minX) / (this.options.cols - 1);
        const deltaY = (this.options.maxY - this.options.minY) / (this.options.rows - 1);

        this.pointRows = [];
        for (let y=0; y<this.options.rows; y++) {
            this.pointRows.push(this.generatePointsOfRow(y * deltaY, deltaX));
        }

        if (this.options.pointsOnTopEdge) {
            this.pointRows[0].map(p => p[1] = 0);
        }
        if (this.options.pointsOnBottomEdge) {
            this.pointRows[this.pointRows.length -1].map(p => p[1] = this.options.maxY);
        }
        if (this.options.pointsOnLeftEdge) {
            this.pointRows.map(row => row[0][0] = 0);
        }
        if (this.options.pointsOnRightEdge) {
            this.pointRows.map(row => row[row.length -1][0] = this.options.maxX);
        }
    }

    private generatePointsOfRow (y: number, deltaX: number) {
        const row: Point[] = [];
        for (let x=0; x<this.options.cols; x++) {

            // random translation (randomDeltaX & randomDeltaY)
            let rX = this.options.randomDeltaX ? Math.random() * this.options.randomDeltaX - this.options.randomDeltaX * 0.5 : 0,
                rY =  this.options.randomDeltaY ? Math.random() * this.options.randomDeltaY - this.options.randomDeltaY * 0.5 : 0
            row.push([
                deltaX * x + rX,
                y + rY
            ]);
        }
        return row;
    }
}