const http = require("http");
const fs = require("fs");

const createAcclegorServer = () => {
  const reqResCallbacks = {};
  const fromattedURL = {};

  function listenServer(port) {
    http
      .createServer(function (req, res) {
        res.writeHead(200, { "Content-Type": "text/html" }); // http header
        var { url } = req;
        const newURL = pathHandler(url);
        const splitURL = newURL.pathname.split("/");

        if (url === "/favicon.ico") {
          res.writeHead(200, { "Content-Type": "image/x-icon" });
          res.end(/* icon content here */);
        } else if (url === "/") {
          req.params = {};
          req.searchParams = newURL.searchParams;

          res.render = (path) => renderPage(path, req, res);
          reqResCallbacks[0](req, res);
        } else {
          for (let i = 1; i < splitURL.length; i++) {
            if (splitURL !== "favicon.ico") {
              const temp = fromattedURL[splitURL.length - 1];
              temp[Object.keys(temp)[i - 1]] = splitURL[i];
            }
          }
          req.params = {};
          req.params = fromattedURL[splitURL.length - 1];
          req.searchParams = newURL.searchParams;
          res.render = (path) => renderPage(path, req, res);
          reqResCallbacks[splitURL.length - 1](req, res);
        }
      })
      .listen(port, function () {
        console.log(`server start at port ${port}`); //the server object listens on port 3000
      });
  }
  return {
    get: (path, callback) =>
      callGetMethod(path, callback, fromattedURL, reqResCallbacks),
    listen: (port) => listenServer(port),
  };
};

function callGetMethod(path, callback, fromattedURL, reqResCallbacks) {
  const pathSplit = path.split("/:");
  const paths = {};

  for (let i = 1; i < pathSplit.length; i++) {
    paths[pathSplit[i]] = "";
  }
  return (
    (fromattedURL[pathSplit.length - 1] = paths),
    (reqResCallbacks[pathSplit.length - 1] = callback)
  );
}

const renderPage = (path, req, res) => {
  return fs.readFile(path, function (err, html) {
    if (err) {
      throw err;
    }
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
};

const pathHandler = (url) => {
  const newURL = new URL(`https://dummydomain.com${url}`);
  return {
    pathname: newURL.pathname,
    searchParams: Object.fromEntries(newURL.searchParams),
  };
};

module.exports = {
  createAcclegorServer,
  callGetMethod,
  renderPage,
  pathHandler,
};
