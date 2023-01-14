export type JSONValue =
  | string
  | number
  | null
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export interface PageProps {
  page?: string;
  referrer?: string;
}

export interface EventProps {
  type: string;
  meta?: JSONValue;
  params?: PageProps;
}

export interface ProximaOptions {
  site: string;
  url?: string; // the URL of the API endpoint
  manual?: boolean | string; // disable automatic tracking
  spa?: 'off' | 'hash' | 'history'; // enable SPA tracking
  hostname?: string; // the hostname of the site, otherwise it will be inferred from the page
  dnt?: boolean | string; // disable tracking if the user has DNT enabled
}

export interface Proxima {
  track: (opts?: PageProps) => void;
  event: (
    type: EventProps['type'],
    opts?: EventProps['meta'],
    params?: PageProps,
  ) => void;
}

export interface PrxWindow {
  _phantom?: string;
  __nightmare?: string;
  doNotTrack?: () => boolean;
  Cypress?: string;
}

declare global {
  interface Window extends PrxWindow {
    proxima: Proxima;
  }
}
