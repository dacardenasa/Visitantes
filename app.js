const express = require('express');
const app = express();
const Database = require('./database');
const Visitor = require('./visitor');
const port = 3000;

const dbConnection = new Database('mongodb://localhost:27017/', { 
  dbName: 'test', 
  useNewUrlParser: true,
});

dbConnection.connect();
let schema = dbConnection.getSchema();
let visitor = new Visitor(schema);

app.get('/', (req, res) => {
  let user = (!req.query.name || req.query.length === 0) ? 'Anónimo' : req.query.name;
  let response = visitor.addVisitor({ name: user });
  res.send(`<h1>${response}</h1>`);
});

app.listen(port, () => { console.log('listening on port 3000!') });