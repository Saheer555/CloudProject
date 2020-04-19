var createError = require('http-errors');
var express = require('express');
const expressHbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carsRouter = require('./routes/car');
var rentRouter = require('./routes/rent');
var adminRouter = require('./routes/admin');

// Passport config
require('./config/passport')(passport);
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Mongo
mongoose.connect(keys.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo DB Connected...'))
    .catch(err => console.log(err));

// view engine setup
app.engine('hbs',
  expressHbs({
    partialsDir: ["views/partials"],
    extname: ".hbs",
    layoutsDir: "views",
    defaultLayout: "./userlayout"
  }));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('reallysecret'));

// Express session
app.use(session({
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: 'true',
  secret: 'reallysecret'
}));

app.use(express.static(path.join(__dirname, 'public')));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.login = req.isAuthenticated();
  res.locals.username = req.user;
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/car', carsRouter);
app.use('/rent', rentRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  var errorstatus = err.status || 500;
  res.render('error', { errorstatus });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));