#!/bin/bash
export NODE_ENV=development;
export NODE_PATH=./\config/\;./\app/\;
mocha --reporter spec --timeout 10000 app/blog/test/blog.js