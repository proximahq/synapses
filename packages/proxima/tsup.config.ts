import { Options } from 'tsup';
import { createTsupConfig } from '../../tsup.config.js';

const defaultconfig = {
  entry: { script: 'src/index.ts' },
  minify: 'terser',
  env: {
    DEBUG: 'false',
  },
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
} as Options;

export default [
  createTsupConfig({
    ...defaultconfig,
    format: ['cjs'],
  }),
  createTsupConfig({
    ...defaultconfig,
    format: ['esm'],
  }),
  createTsupConfig({
    ...defaultconfig,
    format: ['iife'],
    outExtension({ format }) {
      return {
        js: `.js`,
      };
    },
  }),

  createTsupConfig({
    ...defaultconfig,
    format: ['iife'],
    env: {
      DEBUG: 'true',
    },
    outExtension({ format }) {
      return {
        js: `.debug.js`,
      };
    },
  }),
];
