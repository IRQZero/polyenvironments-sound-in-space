var path = require('path');
var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var carteroHook = require('cartero-node-hook');
var carteroMiddleware = require('cartero-express-middleware');
var pagesDir = 'src/pages';
var app = express();
app.set( "port" , process.env.PORT || 3000 );
// view engine setup
app.set('views', path.join(__dirname, pagesDir));
app.set('view engine', 'hbs');
var hook = carteroHook(
  path.join(__dirname, 'public/assets'),
  {
    outputDirUrl : 'assets/'
  }
);
app.use(carteroMiddleware(hook));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up all the routes for the server files in the pages dir
var pages = fs.readdirSync(pagesDir);
console.log('APP-SERVER: Looking for page routes:', pages);
pages.forEach(function(pageDirName, i, pageDirNames) {
  var pageDirPath = path.join(__dirname, pagesDir, pageDirName);
  var pageDirStat = fs.statSync(pageDirPath);
  if(!(pageDirStat instanceof fs.Stats) ||
     !(pageDirStat.isDirectory(pageDirName))) return;
  var routerPath = path.join(pageDirPath, 'server.js');
  if(!(fs.existsSync(routerPath))) return;
  var serverStat = fs.statSync(routerPath);
  if(!(serverStat instanceof fs.Stats)) return;
  console.log('APP-SERVER: Routes loaded for:', pageDirName);
  var pageRouter = require(routerPath);
  app.use('/', pageRouter);
  // console.log('APP-SERVER: Loading partials from:', pageDirPath);
  // // hbs.registerPartials(path.join(__dirname, pageDirPath));
  // var partialPath = path.join(pageDirPath, pageDirName + '.hbs');
  // if(!(fs.existsSync(partialPath))) return;
  // hbs.registerPartial(partialPath, pageDirName);
  // console.log('APP-SERVER: App views dir:', app.get('views'));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000);
