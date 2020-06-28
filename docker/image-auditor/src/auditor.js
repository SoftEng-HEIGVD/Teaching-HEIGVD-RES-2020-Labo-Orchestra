// Import protocol
const protocol = require('./protocol.js');

// Standard Node module to work with UDP
const dgram = require('dgram');
var net = require('net');
var moment = require('moment');

// datagram socket
var udpSocket = dgram.createSocket('udp4');
var tcpServer = net.createServer()

// UDP Socket //

// bind the datagram socket to listen
udpSocket.bind(protocol.UDP_PORT, function() {
  console.log("Listening to the orchestra");
  s.addMembership(protocol.UDP_ADDRESS);
});

// on receiving a message on the socket
udpSocket.on('message', function(msg, source) {
	console.log("Data has arrived: " + msg + ". Source port: " + source.port);
	var json = JSON.parse(msg);
});


// TCP Server //
tcpServer.on('connection', function(socket) {
	var json = [];
	
	json.push({
		uuid: "uuid",
		instrument: "instrument",
		activeSince: "activeSince"
		);
		
	tcpServer.write(JSON.stringify(json));

    tcpServer.end();
});