import * as p from 'path'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import alias from 'rollup-plugin-alias'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input    : p.resolve('src/react-tag-manager.js'),
  output   : {
    file  : p.resolve(`dist/react-tag-manager.${isProduction ? 'min.js' : 'js'}`),
    format: 'umd',
  },
  name     : 'ReactTagManger',
  sourcemap: true,
  globals  : {
    react       : 'React',
    'prop-types': 'PropTypes',
  },
  external : [
    'react',
    'prop-types',
    'debug',
    'react-router',
  ],
  plugins  : [
    babel(),
    nodeResolve({
      jsnext: true,
    }),
    commonjs({
      sourcemap: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    isProduction &&
    uglify({
      warnings: false,
    }),
  ].filter(Boolean),
}
