/**
 * Created by filipv on 08/12/16.
 */
var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs')
var app = express();

var static_path = path.join(__dirname, 'src');

var credentials = {
    key: fs.readFileSync('src/ssl/key.pem'),
    cert: fs.readFileSync('src/ssl/cert.pem')
};

// function ensureSecure(req, res, next){
//     if(req.secure){
//         return next();
//     }
//     res.redirect('https://' + req.hostname + req.url);
// }

// app.all('*', ensureSecure);

app.use(express.static(static_path))
    .get('/*', function (req, res) {
        res.sendFile('index.html', { root: static_path });
    })


var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080,function (err) {
    if (err) { console.log(err) }
    console.log('Listening at port 8080');
});
// httpsServer.listen(8443, function (err) {
//     if (err) { console.log(err) }
//     console.log('Listening at port 8443');
// })
