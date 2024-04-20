import SVGO from 'svgo';
import { mergeRight } from 'ramda';
import { base } from './base';

export const remainFillConfig: SVGO.Config = mergeRight(base, {
  plugins: [
    ...(base.plugins || []),
    {
      name: 'removeAttrs',
      params: {
        attrs: ['class']
      }
    } as any
  ]
});
