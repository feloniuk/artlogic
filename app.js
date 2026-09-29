process.env.PORT = process.env.PORT || 3001;

const next = require("next");
const http = require("http");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => handle(req, res))
    .listen(process.env.PORT, "127.0.0.1", () => {
      console.log(`ArtLogic app listening on port ${process.env.PORT}`);
    });
});
