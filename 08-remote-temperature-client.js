var dnode = require('dnode');

var d = dnode.connect(1337);
d.on('remote', function(remote) {
    remote.getTemperature(function(t) {
        console.log("Temperature is: " + t + "\n");
        d.end();
    });
});
