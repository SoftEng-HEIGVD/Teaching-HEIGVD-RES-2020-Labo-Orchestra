// Import protocol
const protocol = require('./protocol.js');

// Standard Node module to work with UDP
const dgram = require('dgram');
var net = require('net');
var moment = require('moment');

// datagram socket
var udpSocket = dgram.createSocket('udp4');
var tcpServer = net.createServer()