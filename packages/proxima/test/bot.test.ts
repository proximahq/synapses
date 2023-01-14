import { describe, beforeAll, afterAll, expect, test, afterEach } from 'vitest';
import path from 'path';
import create from './serve';
import { loadScript } from './test-utils';

/**
 * window.navigator.webdriver is set to true so we will
 * skip the object mounting
 **/

const here = __dirname;
const mockpath = path.join(here, '..', 'dist');

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

afterEach(() => {
  // @ts-ignore
  window.proxima = undefined;
  // delete scripts
  const scripts = document.querySelectorAll('script[data-site]');
  scripts.forEach(script => {
    script.remove();
  });
});

describe('bot checking', () => {
  test('append and inheriting the object', async () => {
    await loadScript(`http://localhost:${port}/script.debug.js`, {
      'data-site': 'xxx',
    });
    // @ts-ignore
    expect(window.proxima).not.toBeDefined();
  });
});
