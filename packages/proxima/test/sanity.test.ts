import { describe, beforeAll, afterAll, expect, test } from 'vitest';
import path from 'path';
import create from './serve';
import { loadScript } from './test-utils';

const here = __dirname;
const mockpath = path.join(here, '..', 'fixtures');

let server;
let port;

beforeAll(async () => {
  const parsed = await create(mockpath);
  server = parsed[0];
  port = parsed[1];
});

afterAll(() => {
  server && server.close();
});

describe('sanity', () => {
  test('script', async () => {
    await loadScript(`http://localhost:${port}/sanity.js`);
    // @ts-ignore
    expect(window.buzz).toBe('proxima rocks');
  });
});
