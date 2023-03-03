import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import cleanup from 'rollup-plugin-cleanup'

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
      }),
      terser(),
      cleanup()
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]
export default config
