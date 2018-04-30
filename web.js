var express = require("express");
var app = express();
var exec = require('child_process').exec;

app.get("/", function(req, res) {
var dl = 'curl ' + req.query.q + ' > image.jpg';
    exec(dl, function(error, stdout, stderr) {
        console.log(stderr);
    });

console.log('started executing Python');
var cmd = 'python3 classify_image.py --image_file image.jpg';
    exec(cmd, {maxBuffer: 1024 * 500}, function(error, stdout, stderr) {
        res.end(stdout);
        console.log(stdout);
        console.log(error);
        console.log(stderr);
    });
});

app.listen(process.env.PORT, function() {
    console.log("Server running");
});
