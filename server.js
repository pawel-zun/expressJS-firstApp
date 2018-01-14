var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var fs = require('fs');

var stringifyFile;

app.use(bodyParser.json());

app.get('/getNote', function(req, res) {
	console.log('Otrzymałem żądanie GET o dostęp do danych');
	fs.readFile('./test.json', 'utf-8', function(err, data) {
		if (err) throw err;
		stringifyFile = data;
		res.send(data);
	})
});

app.post('/updateNote/:note', function(req, res) {
	console.log('Otrzymałem żądanie POST o nadpisanie danych');
	stringifyFile += req.params.note;
	fs.writeFile('./test.json', stringifyFile, function(err) {
		if (err) throw err;
		console.log('Plik został zaktualizowany');
	});
});

app.listen(3000);