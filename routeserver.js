var finalhandler = require('finalhandler')
var http         = require('http')
//var Router       = require('router')
var Router       = require('express')
 
var router = Router()
router.get('/', function (req, res) {


  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Hello World!')
})

router.get('/ola', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Ola')
});

router.get('/list', function (req, res) {
	var value = req.query.val;
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;
	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
	  if(err) { return console.dir(err); }
	  var collection = db.collection('test');
	  var cursor = collection && collection.find({'mykey':value});
	  var response = cursor && cursor.toArray(function(err,docs){
			var length = docs.length;
			var strJson = "";
			for(var i=0;i<length;){
				strJson += '{"mykey":"' + docs[i].mykey + '"}';
				i=i+1;
				if(i<length){
					strJson += ',';
				}
			}
			strJson = '{"GroupName":"' + 1 + '","count":' + length + ',"teams":[' + strJson + ']}';
			console.log(strJson);
			//return strJson;		
			//res.end(JSON.parse(strJson));
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(strJson);
	   });
	});
});

router.delete("/", function(req,res){
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;
	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
	  if(err) { return console.dir(err); }
	  var collection = db.collection('test');
	 collection.remove({});
	console.log("Closing db");

	}) 
});

router.post('/post', function(req,res){
	var val = req.query.value;
	console.log(val);
	res.setHeader('Content-Type', 'text/plain; charset=utf-8')
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
	  if(err) { return console.dir(err); }

	  var collection = db.collection('test');
	  var doc = {mykey:val, fieldtoupdate:val};

	  collection.insert(doc, {w:1}, function(err, result) {
	    collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1}, function(err, result) {});
	  });

	});

	res.end('Vofeia')
	
});

var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
})

server.listen(3000)
