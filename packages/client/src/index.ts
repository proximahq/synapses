import {
  EventProps,
  Proxima,
  PageProps,
  ProximaOptions,
} from '../../proxima/src/types';

type Cmd =
  | { type: 'track'; opts: PageProps | undefined }
  | { type: 'event'; opts: EventProps | undefined };

declare global {
  interface Window {
    proxima: Proxima;
    __prxmQ?: Cmd[];
  }
}

export interface LoadOptions extends ProximaOptions {
  src?: string;
}

const enqueue = (command: Cmd): void => {
  if (window.__prxmQ === undefined) {
    window.__prxmQ = [];
  }
  window.__prxmQ.push(command);
};

const flush = (): void => {
  if (window.__prxmQ === undefined) {
    window.__prxmQ = [];
  }
  window.__prxmQ.forEach(cmd => {
    switch (cmd.type) {
      case 'track':
        track(cmd.opts);
        break;
      case 'event':
        event(cmd.opts);
        break;
    }
  });
  window.__prxmQ = [];
};

export const track = (opts: PageProps = {}): void => {
  if (window.proxima) {
    window.proxima.track(opts);
  } else {
    enqueue({ type: 'track', opts });
  }
};

export const event = (
  opts: EventProps = {
    type: '',
  },
): void => {
  if (window.proxima) {
    window.proxima.event(opts?.type, opts?.meta, opts?.params ?? {});
  } else {
    enqueue({ type: 'event', opts });
  }
};

const bumpOpts = (opts: Omit<LoadOptions, 'src'>) => {
  const keys = Object.keys(opts) as Array<keyof LoadOptions>;
  if (keys.length === 0) return [];
  return keys.map((key: string) => {
    // @ts-ignore
    return [`data-${key}`, opts[key] ?? 'true'];
  });
};

export const init = (opts?: LoadOptions): void => {
  if (!opts?.site) {
    throw new Error('site is required');
  }

  const { src, ...rest } = opts;
  let tracker = document.createElement('script');
  let script =
    document.getElementsByTagName('script')[0] ||
    document.querySelector('body');
  tracker.id = 'proxima-script';
  tracker.async = true;

  tracker.src = src ? src : 'https://buzz.proxima.so/static/script.js';

  const attrs = bumpOpts(rest);
  attrs.forEach(([key, value]) => {
    tracker.setAttribute(key, value);
  });
  tracker.onload = flush;
  script?.parentNode && script.parentNode.insertBefore(tracker, script);
};
