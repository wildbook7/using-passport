const express = require("express");
const loginController = require("./controllers/loginController");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/login", loginController.login);
app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
