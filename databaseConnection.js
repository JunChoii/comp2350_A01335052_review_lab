const mysql = require("mysql2/promise");

const is_qoddi = process.env.IS_QODDI || false;

const dbConfigQoddi = {
  host: "sql.freedb.tech",
  user: "freedb_junissexy",
  password: "D2QGXfPpU3aq*aY",
  database: "freedb_comp2350-week4-A01335052",
  multipleStatements: false,
};

const dbConfigLocal = {
  host: "localhost",
  user: "root",
  password: "jchoi2022@",
  database: "restaurant_review",
  multipleStatements: false,
};

if (is_qoddi) {
  var database = mysql.createPool(dbConfigQoddi);
} else {
  var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
