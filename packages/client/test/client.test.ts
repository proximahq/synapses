// @vitest-environment happy-dom
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import * as client from '../src/index';
import type { LoadOptions } from '../src/index';
beforeEach(() => {
  // @ts-ignore
  window.proxima = undefined;
  delete window.__prxmQ;
});

describe('init', () => {
  beforeEach(() => {
    const script = document.getElementById('proxima-script');
    if (script) script.remove();
  });

  test('throws', () => {
    expect(() => client.init()).toThrowError('site is required');
  });

  test('injects and loads the script', () => {
    const firstScript = document.createElement('script');
    document.body.appendChild(firstScript);
    client.init({ site: 'xxx' });

    const script = document.getElementById('proxima-script');
    expect(script?.getAttribute('src')).toBe(
      'https://buzz.proxima.so/static/script.js',
    );
  });

  test('injects from another source', () => {
    client.init({ site: 'xxx', src: 'http://example.com/script.js' });
    const script = document.getElementById('proxima-script');
    expect(script?.getAttribute('src')).toBe('http://example.com/script.js');
  });

  test('injects with options', () => {
    const options = {
      site: 'yyy',
      manual: 'true',
      dnt: 'true',
      spa: 'hash',
      url: 'http://example.com',
      hostname: 'foo.bar',
    } as LoadOptions;

    client.init(options);
    const script = document.getElementById('proxima-script');
    const attrs = Object.keys(options).map(key => [
      `data-${key}`,
      options[key],
    ]) as Array<[string, string]>;
    attrs.forEach(([key, value]) => {
      expect(script?.getAttribute(key)).toBe(value);
    });
  });
});
