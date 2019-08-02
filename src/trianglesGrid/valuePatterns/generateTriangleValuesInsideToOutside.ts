import { Triangle } from "../TrianglesGrid";
import { Point } from "../../model";

type Directions = { left: boolean, top: boolean, right: boolean, bottom: boolean };

/** 
 * Return values for each trianngle.
 * 
 * - a Triangle on the center gets the value `insideVal`
 * - the more outside a triangle is (closer to the edge) the more the value will be interpolated with `outsideVal`
 * - trianlges touching outside edges get the value `outsideVal` (TODO: check if this is really like that - it depends on `respectCenterOfTriangles`, right?)
 * 
 * @param insideVal value for the inner most triangle
 * @param outsideVal value for the outer most trianlges
 * @param respectCenterOfTriangles if true: the center (centroid) of the triangles is used to determine the interpolation value
 * (default: the outer most vertex of a triangle is respected)
 * @param ignoreDirection if ignoreDirection.left, -.top, -.right, -bottom is set,
 * than values in this direction don't get more interpolated with `outsideVal`.
 * Example: if ignoreDirection.left and -.right is set to true, the trianlge values would only increase & decrease in y axis (linear gradient).
 */
export function generateTriangleValuesInsideToOutside(
    triangles: Triangle[],
    points: Point[],
    insideVal: number,
    outsideVal: number,
    respectCenterOfTriangles?: boolean,
    ignoreDirection?: Directions
) {
    const xValues = points.map(p => p[0]);
    const yValues = points.map(p => p[1]);
    const xMin = Math.min(...xValues);
    const yMin = Math.min(...yValues);
    const xMax = Math.max(...xValues);
    const yMax = Math.max(...yValues);

    const outsideFactorsForInterpolation: number[] = [];
    const returnValues: number[] = [];

    for (const triangle of triangles) {
        const vertices = [points[triangle.points[0]], points[triangle.points[1]], points[triangle.points[2]]];

        // normalize vertices to values in range [-1;1] ([0,0] is center)
        let verticesNormalized = [
            normalizePoint(vertices[0], xMin, yMin, xMax, yMax),
            normalizePoint(vertices[1], xMin, yMin, xMax, yMax),
            normalizePoint(vertices[2], xMin, yMin, xMax, yMax),
        ];

        /** represents how much outside (0 to 1) the triangle is. */
        let outsideFactorForInterpolation: number;

        // respect center of trianlge
        if (respectCenterOfTriangles) {

            // 1. sum of all x and y values
            let centerVertex = verticesNormalized.reduce((result, currentVertex) => [result[0] + currentVertex[0], result[1] + currentVertex[1]]);

            // 2. divide by amount of vertices in order to get average coord values (=> center vertex)
            centerVertex = [centerVertex[0] / centerVertex.length, centerVertex[1] / centerVertex.length];

            if (ignoreDirection) {
                ignoreCoordValuesInDirection(centerVertex, ignoreDirection)
            }

            // the biggest absolute coordinate value (= most far away from center [0,0]) becomes `outsideFactorForInterpolation`
            outsideFactorForInterpolation = Math.max(...centerVertex.map(coordVal => Math.abs(coordVal)));
        }
        // respect vertex most outside
        else {
            if (ignoreDirection) {
                verticesNormalized.map(vertex => {
                    ignoreCoordValuesInDirection(vertex, ignoreDirection);
                });
            }

            // the biggest absolute coordinate value of all 3 vertices (= most far away from center [0,0]) becomes `outsideFactorForInterpolation`
            outsideFactorForInterpolation = 0;
            verticesNormalized.map(vertex => {
                for (const coord in vertex) {
                    if (Math.abs(vertex[coord]) > outsideFactorForInterpolation) {
                        outsideFactorForInterpolation = Math.abs(vertex[coord]);
                    }
                }
            });
        }
        outsideFactorsForInterpolation.push(outsideFactorForInterpolation);
    }

    // iterate all factor values and interpolate with `insideVal` and `outsideVal`
    for (const f of outsideFactorsForInterpolation) {
        returnValues.push(
            tween(insideVal, outsideVal, f)
        );
    }
    return returnValues;
}

/**
 * normalize Point to values in range [-1;1] (e.g Vertex[20, 25] with xMin=0, yMin=0, xMax=40, yMax=100 becomes [0, -0.25])
 * 
 * @param p Point to normalize
 * @return Point with x and y in range [-1;1]
 */
function normalizePoint(p: Point, xMin: number, yMin: number, xMax: number, yMax: number): Point {
    return [
        (p[0] - xMin) / (xMax - xMin),
        (p[0] - yMin) / (yMax - yMin)
    ]
}

/**
 * Bring normalized values of Point `p` back to center (0), if value is in direction `directions`
*/
function ignoreCoordValuesInDirection(p: Point, directions: Directions) {
    if (directions.left) {
        if (p[0] < 0) {
            p[0] = 0;
        }
    }
    if (directions.right) {
        if (p[0] > 0) {
            p[0] = 0;
        }
    }
    if (directions.top) {
        if (p[1] < 0) {
            p[1] = 0;
        }
    }
    if (directions.bottom) {
        if (p[1] > 0) {
            p[1] = 0;
        }
    }
}

/**
 * tween (from 'in between') returns an interpolated value between `start` and `end`
 * 
 * @param t values from `0` to `1`. If `0`, then return start; if `1` then return end;
 */
function tween(start: number, end: number, t: number) {
    return start + (t * (end - start))
}