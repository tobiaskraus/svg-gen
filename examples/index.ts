import { PointsGrid, SvgRenderer } from '../src/index';

let pointsGrid = new PointsGrid({
    randomDeltaX: 10,
    randomDeltaY: 10,
    maxX: 100,
    maxY: 100,
    pointsOnTopEdge: true,
    pointsOnRightEdge: true,
    pointsOnBottomEdge: true,
    pointsOnLeftEdge: true,
});
pointsGrid.generate();
console.log(pointsGrid.pointRows);

let renderer = new SvgRenderer({
    parentElementSelector: '#stage',
    height: '80vw',
    width: '80vw',
    viewBox: [0, 0, 100, 100],
});
for (let row of pointsGrid.pointRows) {
    for (let point of row) {
        renderer.createCircle(point, 5);
    }
}