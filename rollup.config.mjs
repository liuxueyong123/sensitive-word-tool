import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
// const typescript = require('@rollup/plugin-typescript')
// const dts = require('rollup-plugin-dts')

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: './lib/index.esm.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: './lib/index.cjs.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: './lib/index.umd.js',
        format: 'umd',
        name: 'SensitiveWordTool',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]
// module.exports = config
export default config
