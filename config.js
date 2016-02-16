var secrets = require("./secrets.js");

module.exports = {
  db: process.env.dburl || secrets.dburl
};
