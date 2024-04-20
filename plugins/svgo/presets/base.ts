/**
 * Base SVGO Options
 * https://svgo.dev/docs/plugins/remove-viewbox/
 *
 * inspired by Material UI Icons
 * See https://github.com/mui-org/material-ui/blob/bb3a8aafd9a9c590f26db9b6002c9154b1f4e30b/packages/material-ui-icons/builder.js#L17-L61
 */

import SVGO from 'svgo';

export const base: SVGO.Config = {
  floatPrecision: 2,
  plugins: [
    'cleanupAttrs',
    'removeDoctype',
    'removeXMLProcInst',
    'removeXMLNS',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'removeEmptyContainers',
    // "removeViewBox", // false
    'cleanupEnableBackground',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    'cleanupIds',
    'cleanupNumericValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    // "removeRasterImages", // false
    'mergePaths',
    'convertShapeToPath',
    'sortAttrs',
    'removeDimensions'
  ]
};
