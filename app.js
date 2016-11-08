var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var recursive = require('recursive-readdir');var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var users = [
	{
		fName: 'Paddy',
		lName: 'Claffey',
		email: 'paddyclaffey@gmail.com',
		phone: '',
		password: 'abc'
	},
	{
		fName: 'Aaron',
		lName: 'Barry',
		email: 'ab@gmail.com',
		phone: '',
		password: 'abc'
	},
	{
		fName: 'test',
		lName: 'test',
		email: 'test@gmail.com',
		phone: '',
		password: 'test'
	},
];

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res) {
	res.send({ Error: 'found'});
    //res.sendFile(path.join(__dirname + '/documents/2016/question 2.txt'));
});

app.get('/getFile/:folder/:file', function(req, res) {
	var directory = './documents/' + req.params.id + '/' + req.params.file;
	console.log('trying to get file: ' + directory);
	if (req.params.path) {
		directory += req.params.path;
		res.sendFile(path.join(__dirname + req.params.path));
	} else {
		res.send({ Error: 'File not found'});
	}
});

app.get('/getFileDirectory', function(req, res) {
	console.log('trying to get file: ' + req.params.path);
	res.send({
		years: ['2016', '2015', '2013'],
		questions: ['question1', 'question2', 'question3'],
	});
});


app.get('/userLogin/userDetails', function(req, res) {
	console.log('trying to login: ', req.query.email, req.query.password);
	debugger;
	var response = {
		userDetails : false,
		errorMessage: '',
	}
	var email = req.query.email,
		password = req.query.password;
	
	if (!email || !password) {
		response.errorMessage = 'Not all information was recieved';
		res.send(response);
		return;
	}
	
	for (var i = 0; i < users.length; i++) {
		if (email === users[i].email && password === users[i].password) {
			console.log(users[i], i);
			response.userDetails = users[i];
			res.send(response);
			return;
		}
	}

	res.send(response);
});


app.post('/registerNewUser', function(req, res) {
	console.log('trying to registerNewUser: ');
	var response = {
		createdUser : false,
		errorMessage: '',
	}
	var fName = req.body.fName,
		lName = req.body.lName,
		email = req.body.email,
		phone = req.body.phone;
	
	if (!fName || !lName || !email) {
		response.errorMessage = 'Not all information was recieved';
		res.send(response);
		return;
	}
	
	for (var i = 0; i < users.length; i++) {
		if (email == users[i].email) {
		console.log('here')
			response.errorMessage = 'That email has already been used';
			res.send(response);
			return;
		}
	}
	
	users.push({
		fName: fName,
		lName: lName,
		email: email,
		phone: phone
	});
	
	response.createdUser = true;
	res.send(response);
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/documents/2016/question 3.txt'));
});

app.listen(8081);
console.log('Listening on port 8081');