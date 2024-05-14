const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const express = require("express");
const app = express();
const port = 5173;

const getHtml = async (URLPath) => {
  const path = URLPath === "/" ? "./index.html" : "." + URLPath + ".html";

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

app.get("/((index)?(.html)?)?", async (req, res) => {
  handleRequest(res, "/index");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
