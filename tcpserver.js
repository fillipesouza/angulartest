var net=require('net');

var server = net.createServer(function (socket){
	console.log("Connection from " + socket.remoteAddress);
	socket.end("Hello World");
	console.log("Aloha");
});

server.listen(7000, "localhost");


