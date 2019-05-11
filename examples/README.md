# svg-gen Examples

Some code examples, to see how this library works.

## TypeScript & parcel-bundler

All examples are written in TypeScript.
In order to use the svg-gen library directly (realive path: ..) instead of npm installing and to avoid much configuration, we use parcel.
Parcel is bundler like Webpack, but with less configuration.

## Current issue: Folder structure

I tried to have all examples in subfolders (html + css files).
And to have one index.html in examples root.
But parcel resolves the relative paths wrong, when html files are in subfolders [Parcel issue 2786](https://github.com/parcel-bundler/parcel/issues/2786)

## Build and Test examples

```sh
npm run build
```

the built files will be in in examples/dist/

## Develop

```sh
npm start
```

The browser will open autommatically the local webserver and refreshes when changes are made.