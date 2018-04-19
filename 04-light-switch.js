var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {  
    var led = new five.Led(13);
    var button = new five.Button(12);

    button.on("press", function() {
        led.toggle();
    });
});
