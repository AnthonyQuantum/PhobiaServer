# Phobia (server side)

Phobia application will make your web browsing more comfortable by blocking images that contain something you are afraid of.

At first, Phobia scans all the text you see. If it finds some "keywords", it starts the image scanning process. All images that contain something you are afraid of will be blocked.

The text scan happens on the client side, so it is absolutely private. Phobia does not have any databases and does not store your private data.

## Technologies

Node.js, Python3, Docker

![Structure](images/Structure.png)
Phobia uses pre-trained Inception v3 model and simple image classifier.

[build-badge]: https://img.shields.io/travis/AnthonyQuantum/PhobiaServer/master.png?style=flat-square
[build]: https://travis-ci.org/AnthonyQuantum/PhobiaServer
