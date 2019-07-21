import { TrianglesGrid, TrianglesGridPattern, SvgRenderer } from '../../src';

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