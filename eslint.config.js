const fabric = require('@hankliu/fabric');

module.exports = [
  {
    ...fabric.eslint,
    files: [
      'utils/**/*.ts',
      'templates/**/*.ts',
      'tests/**/*.ts',
      'plugins/**/*.ts',
      'scripts/*.js',
    ]
  },
];
