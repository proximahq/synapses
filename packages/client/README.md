# The Proxima Script Client
Sometimes it's easier to handle how the Proxima script is loaded and configured in your application. This package provides a simple client that can be used to load the Proxima script and configure it accordingly.

## Installation
```bash
npm install @prxm/client
```

## Usage
```js
import * as client  from '@prxm/client';

// Load the Proxima script
client.init({
  site: 'xxx'
});
```

## API Reference

### init(options: InitOptions)
Injects the Proxima script into the DOM and loads the script asynchronously.
#### Options
- `src: string`: The source of the Proxima script. Defaults to `https://buzz.proxima.so/static/script.js`
- `spa?: 'hash' | 'off'`: To disable automatic pageview tracking for Single Page Applications, set this attribute to off. Alternatively, set it to hash to monitor the hash of the URL for changes. By default, the script will automatically track pageviews as history changes.
- `manual?: boolean`: To manually track pageviews and events, set this attribute to on. By default, the script will automatically start monitoring once loaded.
- `hostname?: string`: Use this attribute to specify the hostname of the Proxima registered website, if you want to monitor multiple subdomains under the same Proxima Analytics site.
- `url?: string`: To use a self-hosted version of Proxima Analytics or if you're using a proxy, specify the URL of the Proxima Analytics API using this attribute.
- `dnt?: boolean`: To respect user's privacy, set this attribute to `on`, the script will not track any data if the user has enabled Do Not Track in their browser.

#### Usage
```js
client.init({
  site: 'xxx',
  spa: 'hash',
  manual: true,
  src: 'https://your-site.com/script.js',
  hostname: 'example.com',
  url: 'https://your-site.com/api',
  dnt: true
});
```


### track(options?: PageProps)
Tracks a pageview. If the script is not yet loaded all the tracking calls will be queued and executed once the script is loaded.
#### Options
- `page?: string`: The URL of the pageview. Defaults to `window.location.href`
- `referrer?: string`: The referrer of the pageview. Defaults to `document.referrer`

#### Usage
```js
client.track({
  page: 'https://example.com/hello-world',
  referrer: 'https://duckduckgo.com/page1'
});
```

### event(options?: EventProps)
Tracks an event. If the script is not yet loaded all the tracking calls will be queued and executed once the script is loaded.

#### Options
- `type: string`: The name of the event
- `meta?: object`: The meta data of the event
- `options?: object`: The options of the event, these are the same options as the `track` method.

#### Usage
```js
client.event({
  type: 'click',
  meta: {
    target: 'button'
  },
  options: {
    page: 'https://example.com/hello-world',
    referrer: 'https://duckduckgo.com/page1'
  }
});
```

## References
- [Proxima Analytics](https://proxima.so)
- [Documentation](https://proxima.so/docs)


