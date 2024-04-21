# @hankliu/icons-svg

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] [![build status][github-actions-image]][github-actions-url] [![Codecov][codecov-image]][codecov-url] [![bundle size][bundlephobia-image]][bundlephobia-url] [![dumi][dumi-image]][dumi-url]

[npm-image]: http://img.shields.io/npm/v/@hankliu/icons-svg.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@hankliu/icons-svg
[travis-image]: https://img.shields.io/travis/hankliu62/icons-svg/master?style=flat-square
[github-actions-image]: https://github.com/hankliu62/icons-svg/workflows/CI/badge.svg
[github-actions-url]: https://github.com/hankliu62/icons-svg/actions
[codecov-image]: https://img.shields.io/codecov/c/github/hankliu62/icons-svg/master.svg?style=flat-square
[codecov-url]: https://app.codecov.io/gh/hankliu62/icons-svg
[download-image]: https://img.shields.io/npm/dm/@hankliu/icons-svg.svg?style=flat-square
[download-url]: https://npmjs.org/package/@hankliu/icons-svg
[bundlephobia-url]: https://bundlephobia.com/package/@hankliu/icons-svg
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@hankliu/icons-svg
[dumi-url]: https://github.com/umijs/dumi
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square

🥭 HankLiu SVG 矢量图库，基于 Ant Design SVG 矢量图库，在此基础上新增了许多自定义的 SVG 图标，便于丰富矢量图库，便于业务开发。

## 安装

```bash
npm install @hankliu/icons-svg --save
```

or

```bash
yarn add @hankliu/icons-svg
```

or

```bash
pnpm install @hankliu/icons-svg
```

## 使用

```ts
import { IconAi } from '@hankliu/icons-svg';
// or
// import IconAi from '@hankliu/icons-svg/es/asn/IconAi';

console.log(IconAi);
// ==>
// {
//   name: 'icon-ai',
//   theme: 'icon',
//   icon: {
//     tag: 'svg',
//     attrs: {
//       viewBox: '64 64 896 896',
//       focusable: 'false'
//     },
//     children: [
//       {
//         tag: 'path',
//         attrs: {
//           d:
//             'M894.57 502.5c-5.3-211.36-180.xxxx'
//         }
//       }
//     ]
//   }
// };
```

- 接口定义

这个库将所有 SVG 文件导出为 `IconDefinition`.

```ts
// types.d.ts
export declare type ThemeType = 'filled' | 'outlined' | 'twotone' | 'icon';

export interface AbstractNode {
  tag: string;
  attrs: {
    [key: string]: string;
  };
  children?: AbstractNode[];
}

export interface IconDefinition {
  name: string; // kebab-case-style
  theme: ThemeType;
  icon: ((primaryColor: string, secondaryColor: string) => AbstractNode) | AbstractNode;
}
```

## 渲染

```ts
import { AccountBookFilled } from '@hankliu/icons-svg';
import { renderIconDefinitionToSVGElement } from '@hankliu/icons-svg/es/helpers';

const svgHTMLString = renderIconDefinitionToSVGElement(AccountBookFilled, {
  extraSVGAttrs: { width: '1em', height: '1em', fill: 'currentColor' },
});

console.log(svgHTMLString);
// ==>
// '<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zM648.3 426.8l-87.7 161.1h45.7c5.5 0 10 4.5 10 10v21.3c0 5.5-4.5 10-10 10h-63.4v29.7h63.4c5.5 0 10 4.5 10 10v21.3c0 5.5-4.5 10-10 10h-63.4V752c0 5.5-4.5 10-10 10h-41.3c-5.5 0-10-4.5-10-10v-51.8h-63.1c-5.5 0-10-4.5-10-10v-21.3c0-5.5 4.5-10 10-10h63.1v-29.7h-63.1c-5.5 0-10-4.5-10-10v-21.3c0-5.5 4.5-10 10-10h45.2l-88-161.1c-2.6-4.8-.9-10.9 4-13.6 1.5-.8 3.1-1.2 4.8-1.2h46c3.8 0 7.2 2.1 8.9 5.5l72.9 144.3 73.2-144.3a10 10 0 0 1 8.9-5.5h45c5.5 0 10 4.5 10 10 .1 1.7-.3 3.3-1.1 4.8z" /></svg>'
```

- 接口定义

```ts
declare function renderIconDefinitionToSVGElement(
  icon: IconDefinition,
  options?: HelperRenderOptions,
): string;

interface HelperRenderOptions {
  placeholders?: {
    primaryColor?: string; // default #333
    secondaryColor?: string; // default #E6E6E6
  };
  extraSVGAttrs?: {
    [key: string]: string;
  };
}
```

## 案例

`npm start` 然后打开 http://localhost:8000/examples/

线上案例: https://hankliu62.github.io/icons-svg

## 单元测试

```
npm test
```

## 覆盖率

```
npm run coverage
```

## License

@hankliu/icons-svg is released under the MIT license.
