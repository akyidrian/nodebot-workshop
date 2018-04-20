var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {  
	var pot = new five.Sensor("A2");
    var servo = new five.Servo(9);

	pot.on("change", function() {
		var servoValue = five.Fn.map(this.value, 0, 1023, 0, 179);
		servo.to(servoValue);	
	});
});
