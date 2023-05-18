const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const {expressjwt} = require('express-jwt');
const config = require('config');
const i18n = require('i18n');
const cors = require('cors');
const mustacheExpress = require('mustache');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter = require('./routes/directors');
const moviesRouter = require('./routes/movies');
const membersRouter = require('./routes/members');
const actorRouter = require('./routes/actors');
const genreRouter = require('./routes/genres');
const awaitListRouter = require('./routes/awaitList');

const jwtKey = config.get("secret.key");

const uri = config.get('dbChain');
mongoose.connect(uri);
const db = mongoose.connection;
const app = express();

db.on('open',()=>{
  console.log("Conexion ok");
})

db.on('error',()=>{
  console.log("NO se ha podido iniciar la conexion");
})

i18n.configure({
  locales:['es','en'],
  cookie:'language',
  directory:`${__dirname}/locales`
})

// view engine setup
app.engine('mustache',mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use(cors({
  origin:"http://127.0.0.1:8080"
}));

app.use(expressjwt({secret:jwtKey, algorithms:['HS256']})
    .unless({path:["/login","/directors"]}));

app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/directors',directorsRouter);
app.use('/movies',moviesRouter);
app.use('/members',membersRouter);
app.use('/actors',actorRouter);
app.use('/genres',genreRouter);
app.use('/awaitList',awaitListRouter);


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
