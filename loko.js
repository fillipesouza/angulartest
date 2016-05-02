var finalhandler = require('finalhandler')
var http         = require('http')
//var Router       = require('router')
var Router       = require('express')
 
var router = Router()
router.get('/', function (req, res) {


  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Access-Control-Allow-Origin','*');
  if(req.query.username == "fil" && req.query.pass == "123"){
    res.end('Hello World!');
    
  } else {
      res.status(404).send("not found");
  }
})

router.get('/guys/:numb', function(req,res){
    
    var json1 = "{\"records\":[{\"Name\": \"Alfreds Futterkiste\", \"City\":\"Berlin\",\"Country\": \"Germany\"}]}";

var json2 = "{\"records\":[{\"Name\": \"Alfreds Futterkiste\", \"City\":\"Berlin\",\"Country\": \"Germany\"},{\"Name\": \"Ana Trujillo Emparedados y helados\",\"City\": \"México D.F.\",\"Country\": \"Mexico\"}]}";

var json4 = "{\"records\":[{\"Name\": \"Alfreds Futterkiste\", \"City\":\"Berlin\",\"Country\": \"Germany\"},{\"Name\": \"Ana Trujillo Emparedados y helados\",\"City\": \"México D.F.\",\"Country\": \"Mexico\"},{\"Name\": \"Antonio Moreno Taquería\",\"City\": \"México D.F.\",\"Country\": \"Mexico\"},{\"Name\": \"Around the Horn\",\"City\": \"London\",\"Country\": \"UK\"}]}";
    
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin','*');
    var number = req.params.numb;
    
    if(number == 1){
        setTimeout(function(){
            res.end(json1);
        },2000);
        
    } else if(number == 2){
            setTimeout(function(){
            res.end(json2);
        },4000);
    } else {
            setTimeout(function(){
            res.end(json4);
        },6000);
    }
})



var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
})

server.listen(3000)
