const http = require("http");
const { Stream } = require("stream");
const HOST_NAME = "127.0.0.1";
const port = 3000;
const HEADER_CONTENT_TYPE = "content-type";


const createAcclegorServer = () => {
//   const endPoints = {
//     "/name": function (req, res) {
//       res.end("your name is salil ");
//     },
//     "/photo": function (req, res) {
//       res.end("your name is salil ");
//     },
//     "/profile": function (req, res) {
//       res.end("your profile is great");
//     },
//     "user-profile": function (req, res) {
//       if (req.method === "POST") {
//         res.end("successful ");
//       } else {
//         res.end("wrong method");
//       }
//     },
//   };



  const getRequest = (path, params, url, hostName) => {
    const makeUrl = new URL(`http://${hostName}${url}`);


    const pathSplit = path.split("/:");
    //console.log(pathSplit);
    const assignPath = url.split("/");
    //console.log(assignPath);

    for (let i = 1; i < pathSplit.length; i++) {
        if(pathSplit[i]!=="/favicon.ico")
        params[pathSplit[i]] = assignPath[i];
    }
  };

  const server = http.Server();
  server.listen(port, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${port}/`);
  });


  return {
    get: function (path, callback) {
      server.on("connection", () => {
        console.log("connection established");
      });
      server.on("request", (req, res) => {
        // console.log("is req stream ", req instanceof Stream);
        // console.log("is res stream ", res instanceof Stream);

        const { url } = req;

        // console.log("url => ", url);
        // console.log("Object => ", Object.getOwnPropertyNames(url));
        // console.log("Method => ", req.method);
        // console.log("Params =>  ", req.params);

        if (req.headers[HEADER_CONTENT_TYPE] === "application/json") {
          if (url in endPoints) {
            endPoints[url](req, res);
          }
        }

        req.params={}
        getRequest(path, req.params, url, req.headers.host);
        callback(req, res);
      });
    },
  };
};

module.exports = createAcclegorServer;
