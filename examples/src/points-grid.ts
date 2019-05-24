import { PointsGrid, SvgRenderer } from '../../src/index';

function exampleBasic() {
    const pointsGrid = new PointsGrid({});

    const renderer = new SvgRenderer({
        svgElementSelector: '#example-basic>svg'
    });

    for (const row of pointsGrid.pointRows) {
        for (const point of row) {
            renderer.createCircle(point, 2);
        }
    }
}
exampleBasic();

function exampleWithOptions() {
    const pointsGrid = new PointsGrid({
        randomDistortionX: 4,
        randomDistortionY: 2,
        maxX: 50,
        maxY: 50,
        rows: 6,
        cols: 4,
    });

    const renderer = new SvgRenderer({
        svgElementSelector: '#example-with-options>svg',
        viewBox: [0, 0, 50, 50],
    });

    for (const row of pointsGrid.pointRows) {
        for (const point of row) {
            renderer.createCircle(point, 1);
        }
    }

    document.querySelector('#example-with-options>button')
        .addEventListener('click', e => {
            renderer.clear();
            exampleWithOptions();
        });
}
exampleWithOptions();

function exampleRandomDistortionAndPointsOnEdge() {
    const pointsGrid = new PointsGrid({
        randomDistortionX: 3,
        randomDistortionY: 3,
        minX: 20,
        maxX: 100,
        minY: 20,
        maxY: 100,
        rows: 4,
        cols: 4,
    });

    const renderer = new SvgRenderer({
        svgElementSelector: '#example-random-distortion-and-points-on-edge>svg',
        viewBox: [0, 0, 100, 100],
    });

    for (const row of pointsGrid.pointRows) {
        for (const point of row) {
            renderer.createCircle(point, 1);
        }
    }

    document.querySelector('#example-random-distortion-and-points-on-edge>button')
        .addEventListener('click', e => {
            renderer.clear();
            exampleRandomDistortionAndPointsOnEdge();
        });
}
exampleRandomDistortionAndPointsOnEdge();