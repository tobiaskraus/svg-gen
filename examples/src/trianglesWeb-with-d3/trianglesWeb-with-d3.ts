import * as d3 from 'd3';
import Delaunator from 'delaunator';

import { PointsGrid } from '../../../src';
import { Point } from '../../../src/model';

interface TrianglesWebOptions {
    svgSelector: string;
    rowsAndCols: number;
}

class TrianglesWeb {

    constructor(
        private options: TrianglesWebOptions,
    ) {
        let svg = document.querySelector(this.options.svgSelector),
            width = svg!.getBoundingClientRect().width,
            height = svg!.getBoundingClientRect().height,
            { rows, cols } = this.getWebDimension(this.options.rowsAndCols, width, height);

        let pointsGrid = new PointsGrid({
            maxX: Math.round(width),
            maxY: Math.round(height),
            rows,
            cols,
            roundedNumbers: true,
            pointsOnBottomEdge: true,
            pointsOnLeftEdge: true,
            pointsOnRightEdge: true,
            pointsOnTopEdge: true,
            randomDistortionX: (width / (cols - 1)) * 0.3,
            randomDistortionY: (height / (rows - 1)) * 0.3,
        });

        // flatten array
        let points: Point[] = [];
        pointsGrid.pointRows.map(row => {
            row.map(point => {
                points.push(point);
            })
        })

        // draw points
        d3.select(this.options.svgSelector)
            .selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('r', 2)
            .attr('cx', d => d[0])
            .attr('cy', d => d[1]);

        // let graph = voronoi.voronoi();
        // let triangles = graph.triangles(points);
        // console.log('triangles', triangles);

        let graph = Delaunator.from(points);
        console.log('graph', graph);

        // console.log(graph);

        // retrieve triangles from graph.triangles (Uint32Array to [number, number, number][])
        let triangles = this.getTriangles(graph, points);
        console.log('triangles', triangles);

        // let triangles = Array.prototype.slice.call(graph.triangles);


        // draw triangles
        d3.select(this.options.svgSelector)
            .selectAll('polygon')
            // .data(triangles)
            .data(triangles)
            .enter()
            .append('polygon')
            // .attr('points', d => `${d[0][0]},${d[0][1]} ${d[1][0]},${d[1][1]} ${d[2][0]},${d[2][1]}`);
            .attr('points', (d, i) => `${d[0][0]},${d[0][1]} ${d[1][0]},${d[1][1]} ${d[2][0]},${d[2][1]}`);
    }

    private getWebDimension(rowsAndCols: number, svgWidth: number, svgHeight: number) {
        // rows + cols = rowsAndCols
        // svgWidth / svgHeight = cols / rows
        let ratioWidth = svgWidth / (svgWidth + svgHeight),
            cols = ratioWidth * rowsAndCols,
            rows = rowsAndCols - cols;
        return {
            cols: Math.floor(cols),
            rows: Math.floor(rows),
        }
    }

    private getTriangles(graph: Delaunator<ArrayLike<number>>, points: Point[]): Point[][] {
        let triangles: Point[][] = [];
        for (let i = 0; i < graph.triangles.length; i += 3) {
            triangles.push([
                points[graph.triangles[i]],
                points[graph.triangles[i + 1]],
                points[graph.triangles[i + 2]],
            ]);
        }
        return triangles;
    }
}

new TrianglesWeb({
    rowsAndCols: 12,
    svgSelector: '#svg',
})