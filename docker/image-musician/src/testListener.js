const dgram = require('dgram');
const {PORT, ADDRESS} = require("./config");
const s = dgram.createSocket('udp4');
s.bind(PORT, function () {
    console.log("Joining multicast group");
    s.addMembership(ADDRESS);
});
s.on('message', function(msg, source) {
    console.log("Data has arrived: " + msg + ". Source port: " + source.port+ " "+ source.address);
});