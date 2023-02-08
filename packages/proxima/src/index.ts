import { doNotTrack, buildLog, isBot } from './utils';
import { version } from '../package.json';
import type { JSONValue, PageProps, EventProps } from './types';

const run = () => {
  if (!window) return;
  const {
    navigator: { language, userAgent },
    location: { hostname, pathname, search, origin },
    document,
    history,
  } = window;
  // Get the script from the DOM
  const script = document.querySelector(
    'script[data-site]',
  ) as HTMLScriptElement;
  if (!script) return console.error('script.js not found');

  // Util for attribute
  const attr = (key: string) => {
    const has =
      script &&
      (script.hasAttribute(key) || script.hasAttribute(`data-${key}`));
    if (!has) return false;

    return (
      script.getAttribute(key) || script.getAttribute(`data-${key}`) || has
    );
  };

  const source = script.src || 'https://buzz.proxima.so';
  const log = buildLog();
  // Now grab the attributes
  const shortcode = attr('site'); // shortcode
  const manual = attr('manual'); // should we manual track?
  const url = attr('url') || new URL(source).origin;
  const spa = attr('spa'); // spa off or hash
  const parsedHosthName = attr('hostname') || hostname;

  if (!shortcode) return log('site not found');
  if (isBot(userAgent)) return log('bot detected');
  if (attr('dnt') && doNotTrack()) return log('dnt and dnt=1');

  if (
    'visibilityState' in document &&
    // @ts-ignore
    'prerender' === document.visibilityState
  ) {
    return log('Prerendering');
  }

  const historyAttached = () => {
    const pushState = history.pushState;
    if (void 0 !== history) {
      history.pushState = function () {
        var output = pushState.apply(history, arguments as any);
        return (
          window.dispatchEvent(new Event('pushstate')),
          window.dispatchEvent(new Event('prxm')),
          output
        );
      };
      window.addEventListener('popstate', function () {
        window.dispatchEvent(new Event('prxm'));
      });
      window.addEventListener('prxm', track);
    }
  };

  const hashAttached = () => {
    log('hashAttached');
    window.addEventListener('hashchange', track);
  };

  const send = (p: string, data: JSONValue) => {
    log('send');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + p, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.addEventListener('error', function () {});
    xhr.send(JSON.stringify(data));
  };

  const build = (params: PageProps = {}) => {
    const c = document.querySelector("[rel='canonical']");
    log('build');
    return {
      p: c
        ? params?.page
          ? params?.page
          : c.getAttribute('href')
        : origin + pathname + search,
      v: version,
      s: shortcode,
      h: parsedHosthName || '',
      r: params?.referrer ? params.referrer : document?.referrer || '',
      l: language || '',
      cid: Date.now().toString(32),
      ...params,
    };
  };

  const track = (params = {}) => {
    log('track');
    send('/torch', {
      t: 'pageview',
      ...build(params),
    });
  };

  const event = (
    e: EventProps['type'],
    meta: EventProps['meta'] = {},
    params: PageProps = {},
  ) => {
    if (!e) return;
    log('event');
    send('/torch', {
      t: 'event',
      e,
      mt: meta,
      ...build(params),
    });
  };

  const init = () => {
    log('init');
    if ('true' === window?.localStorage?.proxima_ignore) {
      return console.warn('ignored');
    }
    if (spa && !manual) {
      switch (spa) {
        case 'off':
          break;
        case 'hash':
          hashAttached();
          break;
        default:
          void 0 !== history ? historyAttached() : hashAttached();
          break;
      }
    }
    if (!manual) {
      log('attach on load');
      track();
    }
  };

  if (!window.proxima) {
    window.proxima = {
      track,
      event,
    };
    init();
  }
};
run();
