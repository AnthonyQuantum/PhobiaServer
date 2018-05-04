var express = require("express");
var app = express();
var exec = require('child_process').exec;
var base64Img = require('base64-img');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function(req, res) {
    if (req.query.t == "absolute" || req.query.t == "relative")
    {
        var dl = 'curl ' + req.query.q + ' > image.jpg';
        exec(dl, function(error, stdout, stderr) {
            console.log(stderr);
        });
    }

    executePython(res);
});

app.post("/", function(req, res) {
    if (req.query.t == "base64")
    {
        console.log();
        var filepath = base64Img.imgSync(req.body.image, '', 'image');
    }

    executePython(res);
});

function executePython(res) {
    console.log('started executing Python');
    var cmd = 'python3 classify_image.py --image_file image.jpg';
        exec(cmd, {maxBuffer: 1024 * 500}, function(error, stdout, stderr) {
            res.end(stdout);
            console.log(stdout);
            console.log(error);
            console.log(stderr);
        });
}

app.listen(process.env.PORT, function() {
    console.log("Server running");
});
