const debug = require('debug')('serialport:xbee')
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
//const AverageMap = require('../temperatures/AverageMap')
//const socket = require('../socketio/socket')

const SERIAL = process.env.SERIAL
const BAUD = process.env.BAUD || 9600
debug(SERIAL)
debug(BAUD)
const port = new SerialPort(SERIAL, { baudRate: Number(BAUD) });
//const temperatures = new AverageMap()
const parser = port.pipe(new Readline({ delimiter: '\n' }));

parser.on('data', function (data) {
  debug(data)
  let id = data.substring(0, data.indexOf('-'))
  let msg = data.substring(data.indexOf('-') + 1)
  // If heartbeat, reset timer and discard
  // if (msg === 'HeartBeat') {
  //   temperatures.heartbeat(id)
  // } else {
    temperatures.update(id, msg)
    debug(temperatures.getTemperature())
    socket.pushTemperature(JSON.stringify(temperatures.getTemperature()))

});

module.exports = port;
