# The Proxima Script
Introducing the official [Proxima Analytics](https://proxima.so) tracking script - a minimal, yet powerful piece of code that can be easily integrated into your website to begin collecting valuable data. Designed with efficiency in mind, this script is lightweight and compatible with all contemporary browsers.



## Features
- Exceptionally lightweight at 960 bytes when gzipped
- Universal compatibility with all modern browsers
- Automatic tracking of pageviews and events
- Highly customizable to suit your specific needs and requirements.

## Installation
You can install the Proxima script by simply adding the following snippet to the `<head>` section of your website:

```html
<script
    defer
    data-site="xxx"
    src="https://proxima.so/static/script.js"></script>
```
The script is also available through the jsDelivr CDN:
https://cdn.jsdelivr.net/npm/proxima/dist/script.js

## Usage
The Proxima script has been designed with ease of use in mind. Simply add the script to your website, and you'll be ready to start collecting data. However, for those who wish to tailor the script to their specific needs, the script tag can be enhanced with the following attributes:

- `data-site`: This attribute is required and refers to the unique ID of your Proxima Analytics site.
- `data-spa`: To disable automatic pageview tracking for Single Page Applications, set this attribute to off. Alternatively, set it to hash to monitor the hash of the URL for changes. By default, the script will automatically track pageviews as history changes.`hash` if you want to monitor the hash of the URL for changes. By default, the script will automatically track pageviews as history changes.
- `data-manual`: To manually track pageviews and events, set this attribute to on. By default, the script will automatically start monitoring once loaded.
- `data-hostname`: Use this attribute to specify the hostname of the Proxima registered website, if you want to monitor multiple subdomains under the same Proxima Analytics site.
- `data-url`:  To use a self-hosted version of Proxima Analytics or if you're using a proxy, specify the URL of the Proxima Analytics API using this attribute.
- `data-dnt`: To respect user's privacy, set this attribute to `on`, the script will not track any data if the user has enabled Do Not Track in their browser.
