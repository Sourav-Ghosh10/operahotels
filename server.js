const http = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

let appPrepared = false;
const preparePromise = app.prepare().then(() => {
  appPrepared = true;
  console.log(`> Next.js prepared and ready on port ${port}`);
}).catch((err) => {
  console.error('> Error preparing Next.js:', err);
});

const server = http.createServer(async (req, res) => {
  try {
    if (!appPrepared) {
      await preparePromise;
    }
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  } catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>Internal Server Error</h1>');
  }
});

server.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`> Server listening on port ${port}`);
});
