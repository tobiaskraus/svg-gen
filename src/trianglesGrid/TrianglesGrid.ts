import { Point, Renderable, RenderLayer } from "../model";
import { trianglesGridDoubleOffsets } from "./gridPatterns/trianglesGridDoubleOffsets";

export interface Triangle {
    /** index of points - not points itself */
    points: [number, number, number];
    opacity?: number;
    fillOpacity?: number;
    fill?: string;
}

export enum TrianglesGridPattern {
    DoubleOffset = 'DoubleOffset',
    VGrid = 'VGrid',
    RegularGrid = 'RegularGrid',
}

export enum OpacityPattern {
    FadeOutOutside = 'FadeOutOutside',
    FadeOutInside = 'FadeOutInside',
    FullOutsideRandomInside = 'FullOutsideRandomInside',
    NoneOutsideRandomInside = 'FullOutsideRandomInside',
    Full = 'Full',
    None = 'None',
}

interface TrianglesGridOptions {
    /** algorithm for triangles patten generation. Default: 'doubleOffset'*/
    trianglesPattern: TrianglesGridPattern;

    rows: number;
    cols: number;

    strokeWidth?: number;

    /** for more advanced options, use TrianglesGrid.setFillOpacity.[DesiredPattern](args); */
    fillOpacity?: OpacityPattern | number[];
    opacity?: OpacityPattern | number[][];
    /** it's also possible to set fill value in css: polygon { fill: blue; } */
    fill?: string | string[][];
}

const TRIANGLES_GRID_OPTIONS_DEFAULT: TrianglesGridOptions = {
    trianglesPattern: TrianglesGridPattern.DoubleOffset,
    cols: 5,
    rows: 6
}


/** Class to create a grid of triangles.
 * - stores a flat array of points(topleft to topright to second row left to second row right ...
 * 
 * ### example
 * 
 * [[include:TriangleGrid_example1.md]]
 * 
 * ![example preview](media://TriangleGrid_example1.svg)
 * */
export class TrianglesGrid implements Renderable {
    private options: TrianglesGridOptions;

    /** flat array of points(topleft to topright to second row left to second row right ...  */
    points: Point[] = [];

    /** flat array of triangles (consist of array with indices of points: [indexP0, indexP1, indexP2]) */
    triangles: Triangle[] = [];

    constructor(
        options: Partial<TrianglesGridOptions>
    ) {
        // merge options with default values
        this.options = { ...TRIANGLES_GRID_OPTIONS_DEFAULT, ...options };
        this.generate();
        if (this.options.fillOpacity) {
            this.setFillOpacity(this.options.fillOpacity);
        }
    }

    /** regenerate points and triangles. Only required after changing TrianglesGrid.options.trianglesPattern. */
    generate() {
        const { rows, cols } = this.options;
        let result: { points: Point[], triangles: Triangle[] } = { points: [], triangles: [] };

        // triangles pattern: only points and triangles.points (nothing like fill and so on yet)
        switch (this.options.trianglesPattern) {
            case TrianglesGridPattern.DoubleOffset:
                result = trianglesGridDoubleOffsets(rows, cols, 0.2);
                break;
            case TrianglesGridPattern.VGrid:
                // polyPatternVGrid(this, this.settings);
                console.log('TODO: VGrid');
                break;
            case TrianglesGridPattern.RegularGrid:
                console.log('TODO: RegularGrrid');
                break;
            default:
                throw Error('unknown value in options.trianglesPattern: ' + this.options.trianglesPattern);
        }
        this.points = result.points;
        this.triangles = result.triangles;
    }

    /**
     * set fillOpacity for each triangle. It  accepts a pattern or a flat array of values.
     * 
     * As it's easier to understand which item is which triangle, when using a 2D array,
     * it might help to use a 2D array and flatten it by `[].concat(...[innerArrays])`
     * (inner array's length = this.options.columns * 2, outer array's length = this.options.rows).
     * 
     * ```ts
     * // example for a grid with 4 rows and 5 columns (each cell (column-row) consists of 2 triangles (top-right & left-bottom))
     *  someTriangleGrid.setFillOpacity([].concat(...[
     *      [.1, .2, .3, .4, .5, .6, .8, .9, 1],
     *      [.1, .2, .3, .4, .5, .6, .8, .9, 1],
     *      [.1, .2, .3, .4, .5, .6, .8, .9, 1],
     *      [.1, .2, .3, .4, .5, .6, .8, .9, 1]
     *  ]);
     * 
     * // another example
     * 
     *  someTriangleGrid.setFillOpacity(
     *      generateTriangleValuesInsideToOutside(
     *          someTriangleGrid.triangles[],
     *          someTriangleGrid.points[],
     *          0.2,
     *          1
     *      )
     *  );
     * ```
     *  
     * @param param 
     */
    setFillOpacity(param: OpacityPattern | number[]) {
        console.log('TODO: setFillOpacity()');
        if (Array.isArray(param)) {
            if (typeof param[0] === 'number') {
                if (param.length !== this.triangles.length) {
                    console.warn(`${param.length} values have been passed to setFillOpacity, but there are ${this.triangles.length} triangles`);
                }
                for (let i = 0; i < param.length && i < this.triangles.length; i++) {
                    this.triangles[i].fillOpacity = param[i];
                }
            }
        } else {
            switch (param) {
                case OpacityPattern.Full:
                    this.triangles.map(triangle => triangle.fillOpacity = 1);
                    break;
                case OpacityPattern.None:
                    this.triangles.map(triangle => triangle.fillOpacity = 0);
                    break;
                // case OpacityPattern.FadeOutInside:

            }
        }
    }

    setFillOpacityPattern(pattern: () => number[]) {
        const opacities = pattern();

        opacities.forEach((opacity, i) => {
            this.triangles[i].fillOpacity = opacity;
        })
    }

    getRenderData(): RenderLayer {
        // Casting only required for typedoc which uses currently TypeScript 3.2.4.
        // Somehow it doesn't recognize that the type RenderLayer is correct
        return <RenderLayer>this.triangles.map(triangle => {
            const element = [
                'polygon',
                {
                    points: `${this.points[triangle.points[0]]} ${this.points[triangle.points[1]]} ${this.points[triangle.points[2]]}`
                }
            ];
            if (triangle.fillOpacity !== undefined) {
                element[1]['fill-opacity'] = triangle.fillOpacity.toString();
            }
            return element;
        });
    }
}