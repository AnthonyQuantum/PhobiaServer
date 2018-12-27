const express = require("express");
const bodyParser = require('body-parser');
const spawn = require('child_process').spawn;
const base64Img = require('base64-img');
const now = require("performance-now");
const fs = require('fs');
const request = require('request');

const PORT = 5000;

const app = express();
app.use(bodyParser.json());

// Service function for downloading one image
var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

// Download image and perform classification
app.get("/", async (req, res) => {
    var startTime = now();
    if (req.query.t == "absolute" || req.query.t == "relative") {
        await download(req.query.q, 'image.jpg', () => {
            var endTime = now();
            console.log("\n[Image downloaded in " + (endTime-startTime).toFixed(1) + "ms]");
        });
        classifyImage(res);
    } else {
        res.end("Unknown image format");
    }
});

// Decode image from Base64 and perform classification
app.post("/", function(req, res) {
    var startTime = now();
    if (req.query.t == "base64") {
        base64Img.imgSync(req.body.image, '', 'image');
        var endTime = now();
        console.log("\n[Image decoded in " + (endTime-startTime).toFixed(1) + "ms]");

        classifyImage(res);
    } else {
        res.end("Unknown image format");
    }
});


function classifyImage(res) {
    var startTime = now();

    // run python script
    const pythonProcess = spawn('python3',["classify_image.py", "image.jpg"]);

    pythonProcess.stdout.on('data', (data) => {
        var endTime = now();
        console.log("[Classification finished in " + (endTime-startTime).toFixed(1) + "ms]");
        res.end(data);
        //DEBUG: console.log(stdout, error, stderr);
    });
}

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});