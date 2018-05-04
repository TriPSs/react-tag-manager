import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';

export default {
  input   : path.resolve('src/index.js'),
  output  : [
    { file: 'lib/index.js', format: 'cjs' },
    { file: 'lib/index.es.js', format: 'es' },
  ],
  external: [
    'react',
    'prop-types',
    'debug',
    'react-router',
    'react-helmet',
  ],
  plugins : [
    resolve({
      jsnext: true,
    }),
    babel({
      plugins: [
        'add-react-displayname',
      ],
      presets: [
        ['es2015-rollup'],
        'react',
        'stage-0',
      ],
      exclude: 'node_modules/**',
      babelrc: false,
    }),
  ],
}
