#!/bin/sh
export NODE_PATH=./config:./app/ 
export NODE_ENV=test
mocha --reporter spec --timeout 10000 app/tutorials/test/tutorialSpec.js
