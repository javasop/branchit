var express = require('express')
, exports = module.exports = express()
    , app = exports;

//main config
require("./config")(app);

//global routes
app.use(require('routes'));


app.use("/user",require('user'));
app.use("/blog",require('blog'));
app.use("/info",require('routeMaster'));

