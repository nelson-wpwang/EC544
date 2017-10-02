const MovingAverage = require('./MovingAverage')
const debug = require('debug')('temperatures:AverageMap')

const map = null
const timers = null
const TIMEOUT = process.env.TIMEOUT || 30000

function AverageMap() {
  debug('Creating map')
  this.map = {}
  this.timers = {}
}

AverageMap.prototype.delete = function (id) {
  if (this.map[id]) {
    delete this.map[id];
  }

  if (this.timers[id]) {
    delete this.timers[id];
  }
}

AverageMap.prototype.heartbeat = function (id) {
  if (this.timers[id]) {
    clearTimeout(this.timers[id]);
    this.timers[id] = setTimeout((timer_id) => {
      this.delete(timer_id)
    }, TIMEOUT, id);
  }
}

AverageMap.prototype.update = function (id, temperature) {
  // Weird xbee buffers can cause bad input. discard.
  if (temperature.indexOf('.') !== 2) return
  if (temperature.length != 6) return

  // Already picked up sensor
  if (this.map[id]) {
    this.map[id].update(temperature, id);
    // Add new drop off timer
    clearTimeout(this.timers[id]);
    this.timers[id] = setTimeout((timer_id) => {
      this.delete(timer_id)
    }, TIMEOUT, id);
  // New sensor
  } else {
    this.map[id] = new MovingAverage(temperature, id);
    this.timers[id] = setTimeout((timer_id) => {
      this.delete(timer_id)
    }, TIMEOUT, id);
  }
}

AverageMap.prototype.getTemperatureById = function (id) {
  if (!this.map[id]) {
    debug('ID invalid: ' + id)
    return -1;
  }
  return this.map[id].getAverage()
}

AverageMap.prototype.getTemperature = function () {
  let numSensors = 0;
  let totalTemp = 0;
  let output = {
    reading: 'No sensors',
    sensors: []
  }

  for (var sensor in this.map) {
    if (this.map.hasOwnProperty(sensor)) {
      numSensors++;
      totalTemp += this.map[sensor].getAverage(sensor)
      output.sensors.push({
        id: sensor,
        temp: this.map[sensor].getAverage(sensor)
      });
    }
  }

  debug(numSensors)
  debug(totalTemp)

  output.numSensors = numSensors;

  if (numSensors !== 0) {
    output.reading = totalTemp / numSensors;
  }

  debug(output)
  return output;
}

module.exports = AverageMap;
