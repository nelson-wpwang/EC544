const socketio = require('socket.io')
const debug = require('debug')('socketio:socket')

var io = null;

function configServer(server) {
  io = socketio(server)
}

function pushTemperature(temperature) {
  if (io) {
    io.emit('temperature', temperature)
  }
}

module.exports = {
  configServer: configServer,
  pushTemperature: pushTemperature
}
