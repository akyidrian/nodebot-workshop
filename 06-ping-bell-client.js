var dgram = require('dgram');
var client = dgram.createSocket('udp4');

client.send("", 1337, 'localhost', function(err) {
	console.error("Failed to send. Is your Arduino running '06-ping-bell.js'?\n");
	client.close();
});

