# Contributing

I don't expect anyone to contribute (at least for the beginning not).
This file is more a documentation for myself.

## Publish on npm

Only the `dist/` folder gets published, in order to get a flat structure.

Otherwise:

```ts
import { RenderLayer } from 'svg-gen/dist/model'
```

With `dist/` as the root for npm:

```ts
import { RenderLayer } from 'svg-gen/model'
```

Related article: [Publishing flat npm packages for easier import paths & smaller consumer bundle sizes](https://davidwells.io/blog/publishing-flat-npm-packages-for-easier-import-paths-smaller-consumer-bundle-sizes)

### That's why...

* `npm publish` in root would lead to wrong structure
* `npm run dist` does the job

## Documentation

Currently there is `docs/` (generated from JSDocs) and `examples` (manual written html and ts with webpack).