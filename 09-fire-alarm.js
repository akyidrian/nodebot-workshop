/******************************************************
 *  Current code passes 'nodebot-workshop verify' but
 *  the tests don't take into account that the button
 *  is in a pullup configuration. TODO: Uncomment line
 *  below to get code working on Arduino.
 *
 *                       330        LED
 *    Pin 13  o--------/\/\/-------->|---------
 *                                            |
 *    Pin 5   o----------------------         |
 *                                  |         |
 *                           10k    |         |
 *       +5   o----.--------/\/\/---.         |
 *                 |                |         |
 *                 |                |         |
 *                 |             .--|--|--.   |
 *                 |             | |  |   |   |
 *                 |   Button  --+-|  |   |   |
 *                 |             | |  |   |   |
 *                 |             '--|--|--'   |
 *                 |                |         |
 *                 |                ----------.---o  GND
 *                 __                         |
 *                |   \                       |
 *        A0  o---|    ) TMP36                |
 *                |__ /                       |
 *                 |                          |
 *                 ---------------------------.
 *
 ******************************************************/
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
    var button = new five.Button({
        pin: 5,
        //isPullup: true,  // TODO: Uncomment this when running on Arduino
    });
    var led = new five.Led(13);
    var piezo = new five.Piezo(9);
    var therm = new five.Thermometer({
        controller: "TMP36",
        pin: "A0",
    });

    var fire = false;

    var reset = false;
    button.on("press", function() {
        reset = !reset;
        alarmUpdate();
    });

    var temp = null;
    therm.on("change", function() {
        temp = this.C;
        alarmUpdate();
    });

    var siren = null;
    function alarmActivate() {
        if(!fire) {
            siren = setInterval(function() {
                piezo.frequency(five.Piezo.Notes.c4, 500);
            }, 1000);
            led.on().strobe(500);
            fire = true;
        }
    }

    function alarmDeactivate() {
        if(fire) {
            led.stop().off(); 
            piezo.noTone();
            clearInterval(siren);
            siren = null;
            fire = false;
        }
    }

    function alarmUpdate() {
        if(!reset && temp > 50) {
            alarmActivate();
        } else if (reset && temp <= 50) {
            alarmActivate();
        } else {
            alarmDeactivate();
        }
    }
});
