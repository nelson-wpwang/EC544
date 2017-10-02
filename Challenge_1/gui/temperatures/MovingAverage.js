const average = null;
const numReadings = null;
const id = null;
const shouldDelete = null;
const debug = require('debug')('Moving_average')
var arr = [];

function MovingAverage(firstReading, id) {
  this.average = Number(firstReading);
  this.numReadings = 1;
  this.id = id;
}


MovingAverage.prototype.update = function (nextReading, id) {
    if (id != this.id) throw new Error('ID MISMATCH on update: stored - ' + this.id + ' incoming: ' + id);
    var total = 0;
    if (nextReading > 6) {
        arr.pop();
    }
    arr.unshift(Number(nextReading));
    //total += Number(nextReading);
    for (var i = 0; i<arr.length; i++){
      total += arr[i];
    }
    this.numReadings = this.numReadings + 1;
    this.average = total / arr.length;
    this.average = Math.round(this.average);

}

MovingAverage.prototype.getAverage = function (id) {
  if (id != this.id) throw new Error('ID MISMATCH on getAverage: stored - ' + this.id + ' incoming: ' + id);
  return this.average;
}

MovingAverage.prototype.getNumReadings = function (id) {
  if (id != this.id) throw new Error('ID MISMATCH on getNumReadings: stored - ' + this.id + ' incoming: ' + id);
  return this.numReadings;
}

module.exports = MovingAverage;
