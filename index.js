const http = require("http");
const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");

const getHtml = async (name) => {
  try {
    const filePath = resolve(name);
    const html = await readFile(filePath, { encoding: "utf8" });
    return html;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const server = http.createServer(async (req, res) => {
  const url = req.url === "/" ? "./index.html" : "." + req.url + ".html";
  try {
    const html = await getHtml(url);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
  } catch (error) {
    const html = await getHtml("./404.html");
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(html);
  }
  res.end();
});

server.listen(5173);
