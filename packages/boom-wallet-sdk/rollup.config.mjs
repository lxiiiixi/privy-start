import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].js'
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist/types',
      rootDir: './src'
    }),
    terser({
      compress: {
        drop_console: true,
        pure_funcs: ['console.log']
      },
      format: {
        comments: false
      }
    })
  ],
  external: ['react', '@privy-io/react-auth']
};