var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Dog = require("./models/dog");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )

require('dotenv').config();
const connectionString = process.env.MONGO_CON;
const mongoose = require('mongoose');
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
    console.log("Connection to DB succeeded");
});

// Delete existing dog instances (if needed)
async function recreateDB(){
  // Delete everything
  await Dog.deleteMany();
  let dog1 = new Dog({name:"ghost", age:4,breed:'GermanShepherd'});
  let dog2 = new Dog({name:"rocky", age:3,breed:'Labrodor'});
  let dog3 = new Dog({name:"Charlie", age:5,breed:'Golden Retriever'});
  dog1.save().then(doc=>{
  console.log("First object saved")}
  ).catch(err=>{
  console.error(err)
  });
  dog2.save().then(doc=>{
    console.log("Second object saved")}
    ).catch(err=>{
    console.error(err)
    });
  dog3.save().then(doc=>{
      console.log("Third object saved")}
      ).catch(err=>{
      console.error(err)
      });
 }
 let reseed = true;
 if (reseed) {recreateDB();}


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogRouter = require('./routes/dog');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dog', dogRouter);
app.use('/board', boardRouter);
app.use('/choose',chooseRouter);
app.use('/resource',resourceRouter);

var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
