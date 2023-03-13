const fs = require("fs/promises");

function fetchApi() {
  return fs.readFile("endpoints.json").then((res) => {
    return JSON.parse(res);
  });
}

module.exports = { fetchApi };
