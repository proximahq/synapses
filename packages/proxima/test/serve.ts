import handler from 'serve-handler';
import http from 'http';
import getPort from 'get-port';

const create = async (path: string) => {
  const port = await getPort();
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: path,
    });
  });

  server.listen(port, () => {
    if (process.env.DEBUG) {
      console.log(`Running serve at http://localhost:${port}`);
    }
  });

  return [server, port];
};

export default create;
