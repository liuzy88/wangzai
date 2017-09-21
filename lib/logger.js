var logger = {};

function datetime() {
    var d = new Date();
    return [d.getFullYear(), '-',
        ('0' + (d.getMonth() + 1)).slice(-2), '-',
        ('0' + d.getDate()).slice(-2), ' ',
        ('0' + d.getHours()).slice(-2), ':',
        ('0' + d.getMinutes()).slice(-2), ':',
        ('0' + d.getSeconds()).slice(-2)
    ].join('');
}

function log() {
    var args = [datetime()];
    for (k in arguments) {
        args.push(arguments[k]);
    }
    console.log(args.join(' '));
}

function ip(req) {
    var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip == '::ffff:127.0.0.1' ? '127.0.0.1' : ip;
}

module.exports = function(req, res, next) {
    console.log(datetime(), ip(req), req.method, req.originalUrl), next();
}
