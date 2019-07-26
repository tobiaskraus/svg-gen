# svg-gen

```warning
THIS LIBRARY IS NOT EVEN IN ALPHA VERSION YET - DON'T USE IT NOW!
```

A library to create, manipulate and animate svg via TypeScript (recommended) or JavaScript.

* zero dependencies
* type safe (*written in TypeScript for TypeScript*)
* let's you generate nice visual patterns
* is `NOT recomended` to use already - wait until it's stable!

## Install

```sh
npm install svg-gen
```

## Documentation

 --**Doesn't exist yet**--

Is generated with `typedoc` and published in /docs. But it's not yet available online (no URL).

## Getting Started

```ts
import { TrianglesGrid, SvgRenderer, TrianglesGridPattern } from 'svg-gen';

// create something to render (here: TrianglesGrid)
const trianglesGrid = new TrianglesGrid({
    rows: 6,
    cols: 4,
    trianglesPattern: TrianglesGridPattern.DoubleOffset,
});

// set up the renderer and render the grid
const svgRenderer = new SvgRenderer({});
svgRenderer.render(trianglesGrid);
```

**Result**

![rendered svg](https://raw.githubusercontent.com/tobiaskraus/svg-gen/master/docs_assets/TriangleGrid_example1.svg?sanitize=true)

### Features

* Different Grids:
    * `TrianglesGrid` (Patterns: `RegularGrid`, `VGrid` , `DoubleOffset`)
    * `PointsGrid`
* Renderer (same methods -> easy to change):
    * `SvgRenderer`
    * `CanvasRenderer` --**Doesn't exist yet**--
* Flexible styling
    * (all inline stylings from this library are optional. So you can create with simple CSS all stylings you want)
* Animations --**Doesn't exist yet**--
* Easy creation of own geometries / svgs --**Doesn't exist yet**--


## Contribution

* [Tobias Kraus](https://github.com/tobiaskraus)

Contributing Doku: [CONTRIBUTING.md](CONTRIBUTING.md)