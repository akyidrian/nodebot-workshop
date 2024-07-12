var dnode = require('dnode');
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {  
    var therm = new five.Thermometer({
        controller: "TMP36",
        pin: "A0",
    });

    var temp = null;
    therm.on("change", function() {
        temp = this.C;
    });

    var server = dnode({
        getTemperature: function(cb) {
            cb(temp); 
        }
    });

    server.listen(1337);
});
