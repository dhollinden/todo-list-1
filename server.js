const {createServer} = require("http");
const mime = require("mime");
const {parse} = require("url");
const {resolve} = require("path");
const {readFile} = require("fs");

const baseDirectory = process.cwd();


createServer((request, response) => {
  const path = urlPath(request.url);
  const type = mime.getType(path);
  response.writeHead(200, {"Content-Type": type});
  readFile(path, "utf8", (error, text) => {
    if (error) throw error;
    response.end(text); 
  });
}).listen(8000);


function urlPath(url) {
  const {pathname} = parse(url);
  const path = resolve(decodeURIComponent(pathname).slice(1));
  if (path != baseDirectory &&
      !path.startsWith(baseDirectory + "/")) {
    throw {status: 403, body: "Forbidden"};
  }
  return path;
}