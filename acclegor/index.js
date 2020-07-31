const http = require("http");

const createAcclegorServer = () => {
  const allCallbacks = {};
  const fromattedURL = {};
  const getRequest = (path, params, url, hostName) => {
    const makeUrl = new URL(`http://${hostName}${url}`);
    const pathSplit = path.split("/:");
    //console.log(pathSplit);
    const assignPath = url.split("/");
    //console.log(assignPath);

    for (let i = 1; i < pathSplit.length; i++) {
      if (pathSplit[i] !== "/favicon.ico") params[pathSplit[i]] = assignPath[i];
    }
  };

  function getCall(path, callback) {
    const pathSplit = path.split("/:");
    const paths = {};
    for (let i = 1; i < pathSplit.length; i++) {
      paths[pathSplit[i]] = "";
    }
    fromattedURL[pathSplit.length - 1] = paths;
    allCallbacks[pathSplit.length - 1] = callback;
  }
  function listenServer(port) {
    http
      .createServer(function (req, res) {
        res.writeHead(200, { "Content-Type": "text/html" }); // http header

        var { url } = req;

        const splitURL = url.split("/");

        if (url === "/favicon.ico") {
          res.writeHead(200, { "Content-Type": "image/x-icon" });
          res.end(/* icon content here */);
        } else {
          for (let i = 1; i < splitURL.length; i++) {
            if (splitURL !== "favicon.ico") {
              let temp = fromattedURL[splitURL.length - 1];
              temp[Object.keys(temp)[i - 1]] = splitURL[i];
            }
          }
          req.params = {};
          req.params = fromattedURL[splitURL.length - 1];
          allCallbacks[splitURL.length - 1](req, res);
        }
      })
      .listen(port, function () {
        console.log(`server start at port ${port}`); //the server object listens on port 3000
      });
  }
  return {
    get: (path, callback) => getCall(path, callback),
    listen: (port) => listenServer(port),
  };
};

module.exports = createAcclegorServer;
