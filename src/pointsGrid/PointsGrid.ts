import { Point } from '../model';

interface PointsGridOptions {
    minX: number;   // caution: x of points can be smaller than minX when randomDistortionX > 0 and pointsOnLeftEdge = false
    minY: number;   // caution: value can be below (see explanation above)
    maxX: number;   // caution: value can be above (see explanation above)
    maxY: number;   // caution: value can be above (see explanation above)
    cols: number;
    rows: number;
    roundedNumbers?: boolean;
    randomDistortionX?: number;
    randomDistortionY?: number;
    /** if points of first row should lay exactly on minY (useful if randomDistortion is set) */
    pointsOnTopEdge?: boolean;
    /** if points of last column should lay exactly on maxX (useful if randomDistortion is set) */
    pointsOnRightEdge?: boolean;
    /** if points of bottom row should lay exactly on maxY (useful if randomDistortion is set) */
    pointsOnBottomEdge?: boolean;
    /** if points of left column should lay exactly on minX (useful if randomDistortion is set) */
    pointsOnLeftEdge?: boolean;
}

const POINTS_GRID_OPTIONS_DEFAULT: PointsGridOptions = {
    minX: 0,
    minY: 0,
    maxX: 100,
    maxY: 100,
    cols: 5,
    rows: 5,
}


/** Class to create a grid of points */
export class PointsGrid {

    private options: PointsGridOptions;

    pointRows: Point[][] = []; // top to bottom

    /**
     * @param options object: [[PointsGridOptions]]
     */
    constructor(
        options: Partial<PointsGridOptions>
    ) {
        // merge options with default values
        this.options = { ...POINTS_GRID_OPTIONS_DEFAULT, ...options };
        this.generate();
    }

    generate() {
        const deltaX = (this.options.maxX - this.options.minX) / (this.options.cols - 1);
        const deltaY = (this.options.maxY - this.options.minY) / (this.options.rows - 1);

        this.pointRows = [];
        for (let y = 0; y < this.options.rows; y++) {
            this.pointRows.push(this.generatePointsOfRow(y * deltaY, deltaX));
        }

        if (this.options.pointsOnTopEdge) {
            this.pointRows[0].map(p => p[1] = 0);
        }
        if (this.options.pointsOnBottomEdge) {
            this.pointRows[this.pointRows.length - 1].map(p => p[1] = this.options.maxY);
        }
        if (this.options.pointsOnLeftEdge) {
            this.pointRows.map(row => row[0][0] = 0);
        }
        if (this.options.pointsOnRightEdge) {
            this.pointRows.map(row => row[row.length - 1][0] = this.options.maxX);
        }
    }

    private generatePointsOfRow(y: number, deltaX: number) {
        const row: Point[] = [];
        for (let col = 0; col < this.options.cols; col++) {

            // random translation (randomDistortionX & randomDistortionY)
            let rX = this.options.randomDistortionX ? Math.random() * this.options.randomDistortionX - this.options.randomDistortionX * 0.5 : 0,
                rY = this.options.randomDistortionY ? Math.random() * this.options.randomDistortionY - this.options.randomDistortionY * 0.5 : 0,
                posX = deltaX * col + rX,
                posY = y + rY;

            if (this.options.roundedNumbers) {
                posX = Math.round(posX);
                posY = Math.round(posY);
            }
            row.push([
                posX,
                posY
            ]);
        }
        return row;
    }
}