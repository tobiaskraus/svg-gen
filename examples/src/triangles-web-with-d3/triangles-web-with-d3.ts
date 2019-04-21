import * as d3 from 'd3';

import { PointsGrid } from '../../../src';
import { Point } from '../../../src/model/types';


interface TrianglesWebOptions {
    svgSelector: string;
    rowsAndCols: number;
}

class TrianglesWeb {

    constructor (
        private options: TrianglesWebOptions,
    ) {
        let svg = document.querySelector(this.options.svgSelector),
            width = svg!.getBoundingClientRect().width,
            height = svg!.getBoundingClientRect().height,
            {rows, cols} = this.getWebDimension(this.options.rowsAndCols, width, height);

        let pointsGrid = new PointsGrid({
            maxX: width,
            maxY: height,
            rows,
            cols,
            pointsOnBottomEdge: true,
            pointsOnLeftEdge: true,
            pointsOnRightEdge: true,
            pointsOnTopEdge: true,
            randomDistortionX: (width / (cols -1)) * 0.5,
            randomDistortionY: (height / (rows -1)) * 0.5,
        });

        // flatten array
        let points: Point[] = [];
        pointsGrid.pointRows.map(row => {
            row.map(point => {
                points.push(point);
            })
        })

        d3.select(this.options.svgSelector)
            .selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('r', 2)
            .attr('cx', d => Math.floor(d[0]))
            .attr('cy', d => Math.floor(d[1])); 
    }

    private getWebDimension (rowsAndCols: number, svgWidth: number, svgHeight: number) {
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
}

new TrianglesWeb({
    rowsAndCols: 12,
    svgSelector: '#svg',
})