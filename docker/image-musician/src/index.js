const dgram = require('dgram');
const {v4: uuidv4} = require('uuid');
const {PORT, ADDRESS} = require('./config');

const uuid = uuidv4();

const [instrumentWanted] = process.argv.slice(2);
const instrumentType = [
    {type: 'piano', sound: 'ti-ta-ti'},
    {type: 'trumpet', sound: 'pouet'},
    {type: 'flute', sound: 'trulu'},
    {type: 'violin', sound: 'gzi-gzi'},
    {type: 'drum', sound: 'boum-boum'},
];

const instrument = instrumentType.find(i => i.type === instrumentWanted.toLowerCase());
if (!instrument) throw new Error(`No instrument '${instrumentWanted}' found.`);


const socket = dgram.createSocket('udp4');
const activeSince = new Date();
setInterval(() => {
    const payload = JSON.stringify({
        uuid,
        ...instrument,
        timestamp: Date.now()
    });
    const message = Buffer.from(payload);
    socket.send(message, 0, message.length, PORT, ADDRESS, (error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`Sending payload ${payload} via port ${socket.address().port}`);
    })
}, 1000)