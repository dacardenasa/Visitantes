const express = require('express');
const app = express();
const Database = require('./controllers/database');
const Visitor = require('./controllers/visitor');
require('dotenv').config();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

const dbConnection = new Database(process.env.MONGODB_URL,'mongodb://localhost:27017/mongo-1', 
  { useNewUrlParser: true }
);

dbConnection.connect();
let visitor = new Visitor();

app.get('/', (req, res) => {
  let user = (!req.query.name || req.query.length === 0) ? 'Anónimo' : req.query.name;
  (async function (){
    await visitor.saveVisitor({ name: user });
  }())
  visitor.listVisitors()
    .then((data) => { 
      res.render('template', { visitors: data });
    });
});

app.listen(port, () => { console.log(`listening on port ${port}!`) });