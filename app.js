var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.locals.EJS = require('./lib/EJS');

app.use(require('./lib/logger'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var config = require('./config');

// start-->
// 测试数据
function getRows(count) {
    var rows = [];
    for (var i = 0; i < count; i++) {
        rows.push({});
    }
    return rows;
}
// 主页
app.get('/', function(req, res, next) {
    res.render('index', {
        rows: getRows(22)
    });
});
// 搜索
app.get('/search', function(req, res, next) {
    res.render('search', {
        kw: req.query.kw,
        ssort: req.query.ssort || 1,
        rows: getRows(22)
    });
});
// 主题
app.get('/theme', function(req, res, next) {
    res.render('theme', {
        theme: req.query.theme,
        rows: getRows(22)
    });
});
// 分类
app.get('/cat', function(req, res, next) {
    res.render('cat', {
        cid: req.query.cid,
        cname: req.query.cname,
        csort: req.query.csort || 1,
        rows: getRows(22)
    });
});
// 商品信息
app.get('/goods', function(req, res, next) {
    res.render('goods', {
        rows: getRows(4)
    });
});
// 商品图文
app.get('/detail', function(req, res, next) {
    res.render('detail', {
        rows: getRows(6)
    });
});
// 分页数据
app.get('/nextpage', function(req, res, next) {
    if (req.query.page > 0 && req.query.page < 11) {
        res.render('html/goods-item', { rows: getRows(20) });
        // res.end('end');
    } else {
        res.end('end');
    }
});
// <--end

app.use(function(req, res, next) {
    res.status(404).send('404 Not Found');
});

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('500 Server Error');
});

var server = require('http').createServer(app);
server.on('error', function(e) {
    console.log(e);
});
server.on('listening', function() {
    console.log('Listening on ' + server.address().port);
});
server.listen(process.env.PORT || config.port);
