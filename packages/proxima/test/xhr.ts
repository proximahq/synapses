import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import {
  describe,
  beforeAll,
  afterAll,
  expect,
  test,
  vi,
  afterEach,
  beforeEach,
} from 'vitest';

let xhr: SinonFakeXMLHttpRequest;
let requests: SinonFakeXMLHttpRequest[];


beforeEach(() => {
  xhr = sinon.useFakeXMLHttpRequest();
  requests = [];
  xhr.onCreate = req => {
    requests.push(req);
    return req.respond(200, {}, JSON.stringify({}));
  };
});

afterEach(() => {
  vi.restoreAllMocks();
  xhr.restore();
});
