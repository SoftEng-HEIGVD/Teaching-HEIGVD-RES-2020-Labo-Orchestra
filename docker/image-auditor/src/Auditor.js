const udp_protocol = require('./UDP_protocol');
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

/* Join the multicast group*/
socket.bind(udp_protocol.PROTOCOL_PORT, function () {
    console.log("Joining multicast group");
    socket.addMembership(udp_protocol.PROTOCOL_MULTICAST_ADDRESS);
});

/* Object to map sounds and instruments */
const sounds = {
    "ti-ta-ti": "piano",
    pouet: "trumpet",
    trulu: "flute",
    "gzi-gzi": "violin",
    "boum-boum": "drum"
}

/* a map with the active musicians */
let activeMusicians = new Map();

/*
 * This call back is invoked when a new datagram has arrived.
 */
socket.on('message', function (msg, source) {
    console.log("Data has arrived: " + msg + ". Source port: " + source.port);
    const musician = JSON.parse(msg.toString());
    activeMusicians.set(musician.uuid, {instrument: sounds[musician.sound], activeSince: new Date()});
});

/* Delete inactive musicians for 5 seconds */
function updateActiveness() {
    const now = Date.now();
    activeMusicians.forEach((values, key) => {
            if (now - values.activeSince.getTime() > 5000) {
                activeMusicians.delete(key);
            }
        }
    );
    console.log(activeMusicians);
}

/* Each 5 seconds get rid of non-active musicians */
setInterval(updateActiveness, 5000);
