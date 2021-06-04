const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

function Musician(instrument) {

    const uuid = 1;
    this.instrument = instrument;

    Musician.prototype.update = function () {

        let sound;
        if ("instrument" === "piano") {
            sound = "piu piu"
        } else {
            sound = "miaow"
        }

        let data = {
            uuid: this.uuid,
            instrument: this.instrument,
            activeSince: Date.now(),
        };
        const payload = JSON.stringify(data);

        /* Send the datagram */
        let message = new Buffer(payload);
        socket.send(message, 0, message.length, 9907, "239.255.22.5",
            function (err, bytes) {
                console.log("Sending payload: " + payload + " via port " + socket.address().port);
            }
        );
    }

    /* Each second emit a sound */
    setInterval(this.update.bind(this), 1000);
}

/*
 * Get the instrument as a param
 */
let instrument = process.argv[2];

/*
 * Init a new Musician
 */
const musician = new Musician(instrument);