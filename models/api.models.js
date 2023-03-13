const fs = require("fs/promises");

function fetchEndpoints() {
  return fs.readFile("endpoints.json").then((res) => {
    return JSON.parse(res);
  });
}

module.exports = { fetchEndpoints };
