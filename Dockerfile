FROM ubuntu:16.04
MAINTAINER Anthony Quantum
RUN apt-get update
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs
RUN apt-get install -y python3-pip
RUN pip3 install numpy
RUN pip3 install six
RUN pip3 install tensorflow
RUN pip3 install tensorboard
ADD . /phobia/
ENTRYPOINT cd phobia && node web.js
EXPOSE 5000
