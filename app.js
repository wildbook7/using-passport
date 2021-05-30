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

passport.use(new LocalStrategy({
    userNameField:'username',
    passwordField:'password',
    passReqToCallback: true
},function(req, username, password, done){
    process.nextTick(function(){
    //処理書く
      　//ユーザ名、パスワード不正時の処理を記述する
        if(!username){
            return done(null, false, { message: 'Username is incorrect' })
        //↓にはPasswordチェック処理を実装してください。
        } else if(password !== "password123"){
            return done(null, false, { message: 'Username is incorrect' })
        } else{
            console.log("username"+username)
            return done(null, username);
        }
    })
}));

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
