import { Point, Renderable, RenderLayer } from "./model";
import { trianglesGridDoubleOffsets } from "./trianglesGridPatterns/double-offsets";

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
    fillOpacity?: OpacityPattern | number[][];
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
    }

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

    setFillOpacity(param: OpacityPattern | number[][]) {
        console.log('TODO: setFillOpacity()');
        if (Array.isArray(param)) {
            if (param.length !== this.options.rows || param[0].length !== this.options.cols * 2) {
                console.warn(`setFillOpacity(param): param array has should have the size [${this.options.rows}, ${this.options.cols * 2}]`);
            }
            let i = 0;
            for (let row of param) {
                for (let opacity of row) {
                    ++i;
                    if (this.triangles[i]) {
                        this.triangles[i].fillOpacity = opacity;
                    } else {
                        console.warn('setFillOpacity(param): param array has more values than there are triangles');
                        return;
                    }
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
            }
        }
    }

    getRenderData(): RenderLayer {
        // Casting only required for typedoc which uses currently TypeScript 3.2.4.
        // Somehow it doesn't recognize that the type RenderLayer is correct
        return <RenderLayer>this.triangles.map(triangle =>
            ['polygon', {
                points: `${this.points[triangle.points[0]]} ${this.points[triangle.points[1]]} ${this.points[triangle.points[2]]}`
            }]
        );
    }

}