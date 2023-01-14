import { describe, beforeAll, afterAll, expect, test, afterEach } from 'vitest';
import path from 'path';
import create from './serve';
import { loadScript } from './test-utils';
import { setupServer } from 'msw/node';
import { rest, RestHandler, MockedRequest, DefaultBodyType } from 'msw';
import type { JSONValue } from '../src/types';

// @ts-ignore
window.navigator.userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0';

// @ts-ignore
// Used to skip the bot checking
window.navigator.webdriver = false;

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

describe('mounting', () => {
  const allRequests: JSONValue[] = [];

  const waitForRequest = (siteId: string) => {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        // @ts-ignore
        const request = allRequests.find(req => req.s === siteId);
        if (request) {
          clearInterval(interval);
          resolve(request);
        }
      }, 100);
    });
  };

  const restHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
    rest.post(`http://localhost:${port}/torch`, (req, res, ctx) => {
      const body = req.body as string;
      allRequests.push(JSON.parse(body) as JSONValue);
      return res(ctx.status(200), ctx.json(body));
    }),
  ];

  const mockAPIServer = setupServer(...restHandlers);

  beforeAll(() => {
    mockAPIServer.listen({ onUnhandledRequest: 'bypass' });
  });
  afterAll(() => mockAPIServer.close());
  afterEach(() => mockAPIServer.resetHandlers());

  test('append script and dispatch', async () => {
    await loadScript(`http://localhost:${port}/script.debug.js`, {
      'data-site': 'xxx1',
    });
    // @ts-ignore
    expect(window.proxima).toBeDefined();
    const req = await waitForRequest('xxx1');
    expect(req).toBeDefined();
  });

  test('proxima object works', async () => {
    await loadScript(`http://localhost:${port}/script.debug.js`, {
      'data-site': 'xxx2',
    });
    // @ts-ignore
    expect(window.proxima).toMatchInlineSnapshot(`
      {
        "event": [Function],
        "track": [Function],
      }
    `);
    const req = await waitForRequest('xxx2');
    expect(req).toBeDefined();
  });
});
