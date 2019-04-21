import { PointsGrid, SvgRenderer } from '../../../src/index';

function example1() {
    let pointsGrid = new PointsGrid({
        randomDistortionX: 10,
        randomDistortionY: 10,
        maxX: 100,
        maxY: 100,
        pointsOnTopEdge: true,
        pointsOnRightEdge: true,
        pointsOnBottomEdge: true,
        pointsOnLeftEdge: true,
    });

    let renderer = new SvgRenderer({
        svgElementSelector: '#svg',
        height: '250px',
        width: '250px',
        viewBox: [0, 0, 100, 100],
    });
    for (let row of pointsGrid.pointRows) {
        for (let point of row) {
            renderer.createCircle(point, 2);
        }
    }

    createExample({
        title: 'Create and render PointsGrid',
        description: `We create a PointsGrid which generates for us an array of points [x, y].
Then we set up our SvgRenderer. You can choose if you want to use an existing svg in DOM or to create a new one.
In the end we render our PointsGrid.`,
        parentElementSelector: '#examples',
        code: `let pointsGrid = new PointsGrid({
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

let renderer = new SvgRenderer({
    parentElementSelector: '#stage',
    height: '250px',
    width: '250px',
    viewBox: [0, 0, 100, 100],
});
for (let row of pointsGrid.pointRows) {
    for (let point of row) {
        renderer.createCircle(point, 2);
    }
}`
    });
}
example1();


/* This is only required to display the examples (in html) */
interface Example {
    title: string;
    description: string;
    code: string;
    parentElementSelector: string;
    btns?: {
        name: string;
        callback: () => void;
    }
}
function createExample(example: Example) {
    let exampleWrapper = document.createElement('div');
    exampleWrapper.setAttribute('class', 'example');
    let title = document.createElement('h2');
    title.innerText = example.title;
    let description = document.createElement('p');
    description.innerText = example.description;
    let code = document.createElement('pre');
    code.innerText = example.code;
    let parent = document.querySelector(example.parentElementSelector);

    exampleWrapper.append(title);
    exampleWrapper.append(description);
    exampleWrapper.append(code);

    // todo: buttons

    parent.append(exampleWrapper);
}