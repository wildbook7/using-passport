const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const usersController = require("./controllers/usersController");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(session({secret: "好きな文字列"}));
app.use(passport.initialize()); // Expressを使用している場合はInitializeが必要
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(new LocalStrategy((username, password, done) => {
  if (username !== "test" || password !== "password123"){
      return done(null, false);
  } else{
      return done(null, username);
  }
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get("/login", usersController.login);
let isLogined = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
};
app.get("/example", isLogined, usersController.example);
app.post("/login", passport.authenticate(
  "local", {
    successRedirect: "/example",　//ログイン成功時に遷移したい画面
    failureRedirect: "/login", //ログイン失敗時に遷移したい画面
    session: true
  }
));
app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
