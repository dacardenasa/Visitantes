const express = require("express");
const app = express();
const Database = require("./controllers/database");
const Visitor = require("./controllers/visitor");
const port = 3000;
require("dotenv").config();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));

const dbConnection = new Database(
  process.env.MONGODB_URL,
  "mongodb://localhost:27017/mongo-1",
  { useNewUrlParser: true }
);

dbConnection.connect();
let visitor = new Visitor();

app.get("/", async (req, res) => {
  let user =
    !req.query.name || req.query.length === 0 ? "Anónimo" : req.query.name;
  await visitor.saveVisitor({ name: user });
  
  const data = await visitor.listVisitors();
  res.render("template", { visitors: data });
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
