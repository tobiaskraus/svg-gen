import { Point } from '../../model';
import { Triangle } from '../TrianglesGrid';

/** like RegularGrid, but:
 * - even columns:  positive y offset
 * - odd columns:   negative y offset
 * - even rows:     positive x offset
 * - odd rows:      negative x offset
 * - vertices on edges stay on the edges (offset is applied but vertices are brought back on edge afterwards)
 *
 * @param rows amount of points in y direction
 * @param columns amount of points in x direction
 * @param offsetFactor between 0.1 and 0.25 looks good (bigger than 0.5 results in overlapping triangles)
 * @param smallerOutsideRowCol between 0 and 1. As offset brings vertices out of canvas which are brought back,
 * the outer row & col seems a bit too big. That's why this param helps
 * @return {Point, triangles} *triangles consists only of point indices and no styles yet (opacity, ...)*
 */
export function trianglesGridDoubleOffsets(rows: number, cols: number, offsetFactor: number, smallerOutsideRowCol?: number): {
    points: Point[], triangles: Triangle[]
} {

    smallerOutsideRowCol = smallerOutsideRowCol ? smallerOutsideRowCol : 0;

    const dx = 100 / (cols - smallerOutsideRowCol);
    const dy = 100 / (rows - smallerOutsideRowCol);

    const offsetXForSmallerOutsideCols = -dx * (smallerOutsideRowCol / 2);   // 0 if smallerOutsideRowCol = 0
    const offsetYForSmallerOutsideRows = -dy * (smallerOutsideRowCol / 2);

    const pointRows: [number, number][][] = [];

    // top to bottom
    for (let y = 0; y <= rows; y++) {
        const offsetX = y % 2 === 0 ? dx * offsetFactor : -dx * offsetFactor;
        const row: [number, number][] = [];

        // each row left to right
        for (let x = 0; x <= cols; x++) {
            const offsetY = x % 2 === 0 ? dy * offsetFactor : -dy * offsetFactor;
            row.push([
                x * dx + offsetX + offsetXForSmallerOutsideCols,
                y * dy + offsetY + offsetYForSmallerOutsideRows
            ]);
        }
        pointRows.push(row);
    }

    moveEdgeVerticesOnEdge(pointRows);

    // flatten points array
    const points = ([] as Point[]).concat(...pointRows);
    const triangles = createTriangles(pointRows);

    return { points, triangles };
}

/**
 * create triangles for a grid of points (triangle = array of point indices)
 */
function createTriangles(pointRows: [number, number][][]): Triangle[] {
    const triangles: Triangle[] = [];

    // loop through all rows and columns of points besides last row and last column,
    // as each triangle of a point is created with a point of the lower row and a point of the righter column
    for (let y = 0; y < pointRows.length - 1; y++) {
        for (let x = 0; x < pointRows[y].length - 1; x++) {
            const p = pointRows[y][x];
            triangles.push(...createTrianglesAtPoint(x, y, pointRows[y].length, pointRows.length));
        }
    }
    return triangles;
}

/**
 * creates two triangles with the neighbors of a point (triangle can also be with three neighbor points - without point itself)
 *
 * as offsets moves points in a certain pattern closer to each other / wider away from each other,
 * the function checks if even or odd column to bring always the closer points together
 *
 * @param x x index of Point
 * @param y y index of Point
 * @param xLength how many columns of points
 * @param yLength how many rows of points
 */
function createTrianglesAtPoint(x: number, y: number, xLength: number, yLength: number): Triangle[] {
    const triangles: Triangle[] = [];

    const indexP = y * xLength + x;
    // const indexPLeft = y * xLength + x - 1;
    const indexPRight = y * xLength + x + 1;
    const indexPBottom = (y + 1) * xLength + x;
    // const indexPTop = (y - 1) * xLength + x;
    const indexPBottomRight = (y + 1) * xLength + x + 1;

    // even column
    if (x % 2 === 0) {
        // p + r + br
        triangles.push({ points: [indexP, indexPRight, indexPBottomRight] });

        // p + b + br
        triangles.push({ points: [indexP, indexPBottom, indexPBottomRight] });
    } else {    // odd column
        // p + r + b
        triangles.push({ points: [indexP, indexPRight, indexPBottom] });

        // r + br + b
        triangles.push({ points: [indexPRight, indexPBottomRight, indexPBottom] });
    }
    return triangles;
}

function moveEdgeVerticesOnEdge(pointRows: [number, number][][]) {
    // left & right edge
    for (const row of pointRows) {
        row[0][0] = 0;
        row[row.length - 1][0] = 100;
    }
    // top edge
    for (const point of pointRows[0]) {
        point[1] = 0;
    }
    // bottom edge
    for (const point of pointRows[pointRows.length - 1]) {
        point[1] = 100;
    }
}
