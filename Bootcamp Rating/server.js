var express = require('express');
var mongojs = require('mongojs');

var databaseUrl = 'database';
var collections = ['mainComments'];
var db = mongojs(databaseUrl, collections);


var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
var jsonParser = bodyParser.json(); //parses request.body (undefined String) into a JSON object
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// // PASSPORT JS
// var passport = require('passport');
// var GoogleStrategy = require('passport-google').Strategy;

// passport.use(new GoogleStrategy({
//     returnURL: 'http://www.example.com/auth/google/return',
//     realm: 'http://www.example.com/'
//   },
//   function(identifier, profile, done) {
//     User.findOrCreate({ openId: identifier }, function(err, user) {
//       done(err, user);
//     });
//   }
// ));


// Retrieves the comments from the database
app.get('/mainComments', function(req, res) {
	db.mainComments.find(function(err, docs) {
		res.json(docs);
	})
});

// Parses the body and creates a JSON object
app.post('/mainComments', jsonParser, function(req, res) {
	var svc = req.body;
	db.mainComments.insert(svc, function(err, doc) {
		res.json(doc);
	}); //inserts data into the database
})

// Retrieves a specific id from the database
app.get('/mainComments/:id', function(req, res) {
	var id = req.params.id;
	db.mainComments.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

// Deletes a comment object with a specific id
app.delete('/mainComments/:id', function(req, res) {
	var id = req.params.id;
	console.log('hey', id);
	db.mainComments.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});

// // Redirect the user to Google for authentication
// app.get('/auth/google', passport.authenticate('google'));

// // Google will redirect the user to this URL after authentication.  Finish
// // the process by verifying the assertion.  If valid, the user will be
// // logged in.  Otherwise, authentication has failed.
// app.get('/auth/google/return',
//   passport.authenticate('google', { successRedirect: '/',
//                                     failureRedirect: '/login' }));




app.listen(3000);
