var express = require("express");
var app = express();
var exec = require('child_process').exec;

app.get("/", function(req, res) {
var dl = 'curl ' + req.query.q + ' > image.jpg';
    exec(dl, function(error, stdout, stderr) {
        console.log(stderr);
    });

console.log('Started executing Python');
var cmd = 'python classify_image.py --image_file image.jpg';
    exec(cmd, function(error, stdout, stderr) {
        res.end(stdout);
        console.log(stdout);
    });
});

app.listen(process.env.PORT, function() {
    console.log("Server running");
});
