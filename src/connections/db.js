const mysql = require("mysql");
const util = require('util');

// Create a connection to the database
const connectionData = mysql.createConnection({
//   host: "192.185.41.218",
//   user: 'maneecaf_bounmee',
//   password: '?J?E$R{.TGnh',
//   database: 'maneecaf_bounmee_test',
//   port: '3306'
  host: "localhost",
  user: 'root',
  password: '',
  database: 'phongsavanh',
  port: '3306'
});
// database: 'bl-online-center',

// open the MySQL connection
connectionData.connect((error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Successfully connected to the database.");
});

const connection = util.promisify(connectionData.query).bind(connectionData);

module.exports = connection;
