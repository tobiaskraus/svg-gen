import { PointsGrid, SvgRenderer } from '../src/index';

let pointsGrid = new PointsGrid({
    randomDeltaX: 10,
    randomDeltaY: 10,
    pointsOnTopEdge: true,
    pointsOnRightEdge: true,
    pointsOnBottomEdge: true,
    pointsOnLeftEdge: true,
});
pointsGrid.generate();
console.log(pointsGrid.pointRows);

let renderer = new SvgRenderer('#stage');
for (let row of pointsGrid.pointRows) {
    for (let point of row) {
        renderer.createDot(point, 5);
    }
}