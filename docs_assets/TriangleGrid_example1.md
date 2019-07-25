```ts
const trianglesGrid = new TrianglesGrid({
    rows: 6,
    cols: 4,
    trianglesPattern: TrianglesGridPattern.DoubleOffset,
});
const svgRenderer = new SvgRenderer({});
svgRenderer.render(trianglesGrid);
```