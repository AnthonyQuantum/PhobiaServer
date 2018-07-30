var express = require("express");
var app = express();
var exec = require('child_process').exec;
var base64Img = require('base64-img');
var bodyParser = require('body-parser');
var now = require("performance-now");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('images'));

// Download image and perform classification
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

// Decode image from Base64 and perform classification
app.post("/", function(req, res) {
    if (req.query.t == "base64")
    {
        var filepath = base64Img.imgSync(req.body.image, '', 'image');
    }

    executePython(res);
});

// Image classification
function executePython(res) {
    var startTime = now();
    var cmd = 'python3 classify_image.py --image_file image.jpg';
    exec(cmd, {maxBuffer: 1024 * 1000}, function(error, stdout, stderr) {
        var endTime = now();
        stdout = stdout + "[Classification finished in " + (endTime-startTime).toFixed(1) + "ms]";
        res.end(stdout);
        //console.log(stdout);
        //console.log(error);
        //console.log(stderr);
    });
}

// Launch the server
app.listen(5000, function() {
    console.log("Server running on port " + 5000);
});

module.exports = executePython;
