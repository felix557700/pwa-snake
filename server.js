/**
 * Created by filipv on 08/12/16.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var static_path = path.join(__dirname, 'src');

app.use(express.static(static_path))
    .get('/*', function (req, res) {
        res.sendFile('index.html', { root: static_path });
    })

var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 8080, process.env.HOST_NAME || 'localhost', function (err) {
    if (err) {
        console.log(err)
    }
    console.log('Its show time!');
});
