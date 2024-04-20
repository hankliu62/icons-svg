import { series, parallel } from 'gulp';
import {
  clean,
  copy,
  generateIcons,
  generateEntry,
  generateInline
} from './tasks/creators';
import { generalConfig, remainFillConfig } from './plugins/svgo/presets';
import {
  assignAttrsAtTag,
  adjustViewBox,
  setDefaultColorAtPathTag
} from './plugins/svg2Definition/transforms';
import { twotoneStringify } from './plugins/svg2Definition/stringify';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getIdentifier } from './utils';
import { IconDefinition } from './templates/types';
import { ExtractRegExp } from './tasks/creators/generateInline';

const iconTemplate = readFileSync(
  resolve(__dirname, './templates/icon.ts.ejs'),
  'utf8'
);

export default series(
  // 1. 清空生成文件
  clean(['src', 'inline-svg', 'es', 'lib']),

  parallel(
    // 2.1 拷贝文件 helpers.ts, types.ts
    copy({
      from: ['templates/*.ts'],
      toDir: 'src'
    }),

    // 2.2 生成 "filled" 主题的 SVG 图标的抽象节点
    generateIcons({
      theme: 'filled',
      from: ['svg/filled/*.svg'],
      toDir: 'src/asn',
      svgoConfig: generalConfig,
      extraNodeTransformFactories: [
        assignAttrsAtTag('svg', { focusable: 'false' }),
        adjustViewBox
      ],
      stringify: JSON.stringify,
      template: iconTemplate,
      mapToInterpolate: ({ name, content }) => ({
        identifier: getIdentifier({ name, themeSuffix: 'Filled' }),
        content
      }),
      filename: ({ name }) => getIdentifier({ name, themeSuffix: 'Filled' })
    }),

    // 2.2 生成 "outlined" 主题的 SVG 图标的抽象节点
    generateIcons({
      theme: 'outlined',
      from: ['svg/outlined/*.svg'],
      toDir: 'src/asn',
      svgoConfig: generalConfig,
      extraNodeTransformFactories: [
        assignAttrsAtTag('svg', { focusable: 'false' }),
        adjustViewBox
      ],
      stringify: JSON.stringify,
      template: iconTemplate,
      mapToInterpolate: ({ name, content }) => ({
        identifier: getIdentifier({ name, themeSuffix: 'Outlined' }),
        content
      }),
      filename: ({ name }) => getIdentifier({ name, themeSuffix: 'Outlined' })
    }),

    // 2.3 生成 "twotone" 主题的 SVG 图标的抽象节点
    generateIcons({
      theme: 'twotone',
      from: ['svg/twotone/*.svg'],
      toDir: 'src/asn',
      svgoConfig: remainFillConfig,
      extraNodeTransformFactories: [
        assignAttrsAtTag('svg', { focusable: 'false' }),
        adjustViewBox,
        setDefaultColorAtPathTag('#333')
      ],
      stringify: twotoneStringify,
      template: iconTemplate,
      mapToInterpolate: ({ name, content }) => ({
        identifier: getIdentifier({ name, themeSuffix: 'TwoTone' }),
        content
      }),
      filename: ({ name }) => getIdentifier({ name, themeSuffix: 'TwoTone' })
    }),

    // 2.4 生成 "自定义" 主题的 SVG 图标的抽象节点
    generateIcons({
      theme: 'icon',
      from: ['svg/icons/*.svg'],
      toDir: 'src/asn',
      svgoConfig: generalConfig,
      extraNodeTransformFactories: [
        assignAttrsAtTag('svg', { focusable: 'false' }),
        adjustViewBox
      ],
      stringify: JSON.stringify,
      template: iconTemplate,
      mapToInterpolate: ({ name, content }) => ({
        identifier: getIdentifier({ name }),
        content
      }),
      filename: ({ name }) => getIdentifier({ name })
    })
  ),
  parallel(
    // 3.1 generate entry file: src/index.ts
    generateEntry({
      entryName: 'index.ts',
      from: ['src/asn/*.ts'],
      toDir: 'src',
      banner: '// This index.ts file is generated automatically.\n',
      template: `export { default as <%= identifier %> } from '<%= path %>';`,
      mapToInterpolate: ({ name: identifier }) => ({
        identifier,
        path: `./asn/${identifier}`
      })
    }),

    // 3.2 generate inline SVG files
    generateInline({
      from: ['src/asn/*.ts'],
      toDir: ({ _meta }) => `inline-svg/${_meta && _meta.theme}`,
      getIconDefinitionFromSource: (content: string): IconDefinition => {
        const extract = ExtractRegExp.exec(content);
        if (extract === null || !extract[1]) {
          throw new Error('Failed to parse raw icon definition: ' + content);
        }
        return new Function(`return ${extract[1]}`)() as IconDefinition;
      }
    }),
    // 3.3 生成带有命名空间的行内 SVG 文件
    generateInline({
      from: ['src/asn/*.ts'],
      toDir: ({ _meta }) => `inline-namespaced-svg/${_meta && _meta.theme}`,
      getIconDefinitionFromSource: (content: string): IconDefinition => {
        const extract = ExtractRegExp.exec(content);
        if (extract === null || !extract[1]) {
          throw new Error('Failed to parse raw icon definition: ' + content);
        }
        return new Function(`return ${extract[1]}`)() as IconDefinition;
      },
      renderOptions: {
        extraSVGAttrs: { xmlns: 'http://www.w3.org/2000/svg' }
      }
    })
  )
);
