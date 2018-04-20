/******************************************************
 *  Note, the logic here is purposely backwards to a
 *  street light. The nodebot-workshop wrongly expects
 *  it be done this way with the circuit given. The LED
 *  should really turn on when there is little light
 *  (e.g. when this.value < 600).
 *
 *                PhotoR     10K
 *         +5 o---/\/\/--.--/\/\/--.--o GND
 *                       |         |
 *     Pin A0 o-----------         |
 *                                 |
 *                330     LED      |
 *      Pin 9 o--/\/\/----->|-------
 *
 ******************************************************/
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {
    var led = new five.Led(9);
    var sensor = new five.Sensor("A0");

    sensor.on("change", function() {
        if(this.value > 600) { led.on(); }
        else { led.off(); }
    });
});
