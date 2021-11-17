# vite-plugin-shared-modules

<div align="center">

[![Known Vulnerabilities][known-vulnerabilities-image]][known-vulnerabilities-url]
[![Maintainability][maintainability-image]][maintainability-url]
![publish workflow][publish-workflow-image]
[![license][license-image]][license-url]
[![GitHub issues][github-issues-image]][github-issues-url]
![NPM bundle size(minified + gzip)][bundle-size-image]

[known-vulnerabilities-image]: https://snyk.io/test/github/zheeeng/vite-plugin-shared-modules/badge.svg
[known-vulnerabilities-url]: https://snyk.io/test/github/zheeeng/vite-plugin-shared-modules

[maintainability-image]: https://api.codeclimate.com/v1/badges/d3eaf22221bf57742429/maintainability
[maintainability-url]: https://codeclimate.com/github/zheeeng/vite-plugin-shared-modules/maintainability

[publish-workflow-image]: https://github.com/zheeeng/vite-plugin-shared-modules/actions/workflows/publish.yml/badge.svg

[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/zheeeng/vite-plugin-shared-modules/blob/master/LICENSE

[github-issues-image]: https://img.shields.io/github/issues/zheeeng/vite-plugin-shared-modules
[github-issues-url]: https://github.com/zheeeng/vite-plugin-shared-modules/issues

[bundle-size-image]: https://img.shields.io/bundlephobia/minzip/vite-plugin-shared-modules.svg

[![NPM](https://nodei.co/npm/vite-plugin-shared-modules.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vite-plugin-shared-modules/)

</div>

> Share node_modules in monorepos. Best friend for pnpm's module isolation and module singletons sharing.

Use it as simple as:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import sharedModulesPlugin from 'vite-plugin-shared-modules'
import tsconfigPaths from 'rollup-plugin-tsconfig-paths';

export default defineConfig({
  plugins: [
    sharedModulesPlugin({
      packageName: '@monorepo/shared',
    }),
    // necessary for resolving modules in `node_modules`
    tsconfigPaths({
      // specify the project's tsconfig.json, which configured paths mapping.
      tsConfigPath: join(__dirname, '../../tsconfig.json')
    }),
  ]
});
```

then you can import singletons by this way:

```ts
import foo from '@monorepo/shared/foo'
import bar from '@monorepo/shared/bar'
```

is equivalent to

```ts
import foo from '@monorepo/shared/node_modules/foo'
import bar from '@monorepo/shared/node_modules/bar'
```

moreover for getting type-safe, add tsconfig paths mapping:

```json
// tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
            "paths": {
                "@monorepo/shared/*": ["./packages/shared/node_modules/*", "./packages/shared/node_modules/@types/*"]
            }
    }
}
```

the example above we assume the package `@monorepo/shared` is located under `./packages/shared`.

---

## Full Option

The plugin options signatures:

```ts
export type SharedModulesPluginOption = {
  packageName: string,
  subpath?: string,
  nodeModules?: string,
  sourceMap?: boolean,
}
```

The default options:

```ts
export const defaultSharedModules = {
  subpath: '',
  nodeModules: 'node_modules',
  sourceMap: true,
}
```
