fs = require('fs');

module.exports = function (mongoose) {

// load schemes
    fs.readdirSync(__dirname + '/').forEach(function (file) {
        //ignore files with name "index"
        if (~file.indexOf('.js') && file.indexOf('index') == -1) {
            require(__dirname + '/' + file);
        }

    });

}
