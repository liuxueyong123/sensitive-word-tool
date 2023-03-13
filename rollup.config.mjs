import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import cleanup from 'rollup-plugin-cleanup'

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: './lib/index.cjs.js',
        format: 'cjs'
      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.cjs.json'
      }),
      terser(),
      cleanup()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: './lib/index.esm.js',
        format: 'esm'
      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.esm.json'
      }),
      terser(),
      cleanup()
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'lib/index.d.ts', format: 'ems' }],
    plugins: [dts()]
  }
]
export default config
