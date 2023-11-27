import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export function createTsupConfig({
  entry = ['src/index.ts'],
  external = [],
  format = ['esm', 'cjs'],
  target = 'es2022',
  clean = true,
  outDir = 'dist',
  minify = true,
  dts = true,
  sourcemap = true,
  ...args
}: Options = {}) {
  return defineConfig({
    entry,
    external,
    format,
    target,
    clean,
    outDir,
    minify,
    dts,
    sourcemap,
    esbuildOptions(options, context) {},
    ...args,
  });
}
