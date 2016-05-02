var net=require('net');

var server = net.createServer(function (socket){
	console.log("Connection from " + socket.remoteAddress);
	socket.end("Hello World");
});

server.listen(7000, "localhost");


