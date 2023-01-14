export const isBot = (userAgent: string) => {
  return (
    /(bot|spider|crawl)/i.test(userAgent) ||
    window._phantom ||
    window.__nightmare ||
    window.navigator.webdriver ||
    window.Cypress
  );
};

export const doNotTrack = () => {
  const { doNotTrack, navigator } = window;
  const dnt = doNotTrack || navigator.doNotTrack;
  return dnt === 'yes' || dnt === '1';
};

export const buildLog = () => (msg: string | string[]) => {
  // @ts-ignore
  if (DEBUG as string) {
    console.warn('Proxima:', msg);
  }
};
