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
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread'
      ],
      presets: [
        '@babel/preset-react',
      ],
      exclude: 'node_modules/**',
      babelrc: false,
    }),
  ],
}
