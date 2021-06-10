const net = require('net');
const dgram = require('dgram');
const {UDP_PORT, UDP_ADDRESS, TCP_PORT} = require("./config");
const s = dgram.createSocket('udp4');

const instruments = new Map();

s.bind(UDP_PORT, () => {
    console.log("Joining multicast group");
    s.addMembership(UDP_ADDRESS);
});

s.on('message', (msg, source) => {
    console.log("Data has arrived: " + msg + ". Source port: " + source.port + " " + source.address);
    try {
        const payload = JSON.parse(msg.toString('utf8'));
        instruments.set(payload.uuid, {
            uuid: payload.uuid,
            instrument: payload.type,
            activeSince: new Date()
        })
    } catch (e) {
        console.log(`An error occurred`);
    }
});

//Check timeout
setInterval(() => {
    instruments.forEach((i, key) => {
        if ((Date.now() - i.activeSince.getTime()) > 5000) {
            instruments.delete(key);
        }
    })
}, 1000);

//TCP
const server = net.createServer((socket) => {
    console.log(`New client connected: ${socket.remoteAddress}`);
    socket.write(JSON.stringify([...instruments.values()]))
    socket.end();
});

server.listen(TCP_PORT);