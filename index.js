const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const express = require("express");
const app = express();
const port = 5173;

const resolveFilename = (URLPath) => {
  if (URLPath.match(/.html$/)) return `.${URLPath}`;
  if (URLPath === "/") return "./index.html";

  return `.${URLPath}.html`;
};

const getHtml = async (URLPath) => {
  const path = resolveFilename(URLPath);

  try {
    const html = await readFile(resolve(path), { encoding: "utf8" });
    return html;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const handleRequest = async (res, path) => {
  try {
    const html = await getHtml(path);
    res.send(html);
  } catch (error) {
    const html = await getHtml("/404");
    res.status(404).send(html);
  }
};

app.get("*", async (req, res) => {
  handleRequest(res, "/index");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
