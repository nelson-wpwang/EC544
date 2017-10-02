function getReading(id, temperature) {
  var finalTemp;
  finalTemp = Math.round(temperature);
  return "<h5>Id:" + id + " - Temperature: " + finalTemp + "</h5>"
}

var socket = io();

socket.on('temperature', function(msg) {
    var info = JSON.parse(msg);
    document.getElementById('#temperature').innerText = Math.round(info.reading) + " (Degrees F)";
    document.getElementById('#sensors').innerText = info.numSensors;
    var sensors = info.sensors;

    var sensors_reading = "";

    for (var i = 0 ; i < sensors.length; i++) {
      sensors_reading += getReading(sensors[i].id, sensors[i].temp)
    };

    document.getElementById('#sensors_detailed').innerHTML = sensors_reading;
});
