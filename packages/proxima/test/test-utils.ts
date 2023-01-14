import { matchRequestUrl, MockedRequest } from 'msw';

export const loadScript = async (src: string, params = {}) => {
  const keys = Object.keys(params);
  const attrs = keys.map(key => params[key]);

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.id = 'proxima-lib';
    script.type = 'text/javascript';
    script.async = true;

    attrs.forEach((value, index) => {
      script.setAttribute(keys[index], value);
    });

    script.onload = resolve;
    script.onerror = reject;
    script.src = src;
    document.head.appendChild(script);
  });
};
