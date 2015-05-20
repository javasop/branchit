/**
 * This is a self-contained module that defines its routes, callbacks, models and views
 * all internally. Such approach to code organization follows the recommendations of TJ:
 *
 * http://vimeo.com/56166857
 *
 */
module.exports = function (runningApp) {

    configFile = require("config");
    var session = require('express-session');
    var passport = require('passport');
    var bodyParser = require('body-parser');
    var robots = require('robots.txt')
    var sm = require('sitemap');



    // Pass in the absolute path to your robots.txt file
    runningApp.use(robots(__dirname + '/robots.txt'))


    //pass sitemap if it's requested
        , sitemap = sm.createSitemap ({
        hostname: 'http://www.itechdom.com',
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: [
            { url: '/' },
            { url: '/#!/about' },
            { url: '/#!/blog' }
        ]
    });

    runningApp.get('/sitemap.xml', function(req, res) {
        sitemap.toXML( function (xml) {
            res.header('Content-Type', 'application/xml');
            res.send( xml );
        });
    });


    //setup DB
    runningApp.use(require('eyeo'));

    runningApp.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))

    runningApp.use(passport.initialize());
    runningApp.use(passport.session());


    // parse application/x-www-form-urlencoded
    runningApp.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    runningApp.use(bodyParser.json())


    runningApp.use(passport.session());


    //set the port
    runningApp.set('port', (configFile.get('port')));


    runningApp.listen(runningApp.get('port'), function() {
        console.log("Node app is running at localhost:" + runningApp.get('port'));
    });

};


