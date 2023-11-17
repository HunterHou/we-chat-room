const net = require('node:net');

const hostname = '127.0.0.1';
const port = 3000;

const server = net.createServer((socket) => {
    socket.end('goodbye\n');
}).on('error', (err) => {
    // Handle errors here.
    throw err;
});

// Grab an arbitrary unused port.
server.listen(port, hostname, (res) => {
    console.log(`Server res:`, res);
});
