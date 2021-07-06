var createError = require('http-errors');
var express = require('express');
const cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dbcon = require('./core/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contactsRouter')
var messagesRouter = require('./routes/messagesRouter')
var addContactRouter = require('./routes/addContact')
var adminRouter = require('./routes/adminLogin')
var deleteRouter = require('./routes/deleteContact')

var sendTelnyxRouter = require('./routes/sendTelnyx')
var receiveTelnyxRouter = require('./routes/receviveTelnyx')

var sampleTestRouter = require('./routes/sampleTest')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/login', indexRouter);
app.use('/adminlogin', adminRouter);
app.use('/messages', messagesRouter);
app.use('/contacts', contactsRouter);
app.use('/addcontact', addContactRouter);
app.use('/sendtelnyx', sendTelnyxRouter);
app.use('/receivetelnyx', receiveTelnyxRouter);
app.use('/sampletest', sampleTestRouter);
app.use('/deleteContact', deleteRouter);

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
