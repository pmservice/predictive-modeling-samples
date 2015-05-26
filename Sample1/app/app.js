
// BASE SETUP
// =============================================================================

var path			 	= require('http');
var path			 	= require('https');
var path			 	= require('path');
var bodyParser 	= require('body-parser');
var express    	= require('express');
var request 		= require('request');

var app        	= express(); // define our app using express

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = (process.env.VCAP_APP_PORT || process.env.PORT || 3000);
var host = (process.env.VCAP_APP_HOST || process.env.HOST || 'localhost');

var defaultBaseURL = '<from your service instance on Bluemix>';
var defaultAccessKey = '<from your service instance on Bluemix>';

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var env = { baseURL: defaultBaseURL, accessKey: defaultAccessKey };

//{
//  "VCAP_SERVICES": {
//    "pm-20": [
//      {
//        "credentials": {
//          "access_key": "access key",
//          "url": "scoring server url"
//        },
//        "label": "pm-20",
//        "name": "Predictive Modeling-ct",
//        "plan": "free",
//        "tags": [
//          "business_analytics",
//          "ibm_created",
//          "ibm_beta"
//        ]
//      }
//    ]
//  }
//}
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
var service = (services['pm-20'] || "{}");
var credentials = service[0].credentials;
if (credentials != null) {
		env.baseURL = credentials.url;
		env.accessKey = credentials.access_key;
}

var rootPath = '/score';

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 	// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
 	next(); // make sure we go to the next routes and don't stop here
});

// env request
router.get('/', function(req, res) {
	res.json(env);
});

// score request
router.post('/', function(req, res) {
	var scoreURI = env.baseURL + '/score/' + req.body.context + '?accesskey=' + env.accessKey;
console.log('=== SCORE ===');
console.log('  URI  : ' + scoreURI);
console.log('  Input: ' + JSON.stringify(req.body.input));
console.log(' ');
	try {
		var r = request.post(scoreURI, { json: true, body: req.body.input });
		req.pipe(r);
		r.pipe(res);
	} catch (e) {
		console.log('Score exception ' + JSON.stringify(e));
    var msg = '';
    if (e instanceof String) {
    	msg = e;
    } else if (e instanceof Object) {
      msg = JSON.stringify(e);
    }
    res.status(200);
    return res.send(JSON.stringify({
        flag: false,
        message: msg
  	}));
	}
	
	process.on('uncaughtException', function (err) {
    console.log(err);
	}); 
});
        
// Register Service routes and SPA route ---------------

// all of our service routes will be prefixed with rootPath
app.use(rootPath, router);

// SPA AngularJS application served from the root
app.use(express.static(path.join(__dirname, 'public')));

// START THE SERVER with a little port reminder when run on the desktop
// =============================================================================
app.listen(port, host);
console.log('App started on port ' + port);
