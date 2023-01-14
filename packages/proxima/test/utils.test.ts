import { expect, test, describe } from 'vitest';
import { isBot } from '../src/utils';

describe('isBot', () => {
  test('isBot naive catcher', () => {
    expect(
      isBot(
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      ),
    ).toBe(true);
    expect(
      isBot(
        'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
      ),
    ).toBe(true);

    expect(
      isBot('Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)'),
    ).toBe(true);

    expect(
      isBot(
        'Mozilla/5.0 (Linux; Android 5.0; SM-G920A) AppleWebKit (KHTML, like Gecko) Chrome Mobile Safari (compatible; AdsBot-Google-Mobile; +http://www.google.com/mobile/adsbot.html)',
      ),
    ).toBe(true);
  });
});
