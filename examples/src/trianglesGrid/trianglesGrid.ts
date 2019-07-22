import { TrianglesGrid, TrianglesGridPattern, SvgRenderer } from '../../../src';

/*
    Basic Grid
*/
const trianglesGrid = new TrianglesGrid({
    rows: 6,
    cols: 4,
    trianglesPattern: TrianglesGridPattern.DoubleOffset,
});
const svgRenderer = new SvgRenderer({
    svgElementSelector: '#svg',
    viewBox: [0, 0, 100, 100],
});
svgRenderer.render(trianglesGrid);

/*
    Apply styles
*/
trianglesGrid.setFillOpacity([
    [0, 0, 0, 0, 1, 1, 0.5, 0.5],
    [0.5, 0.5, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]);

