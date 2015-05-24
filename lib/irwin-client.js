var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://womack.io:1883');
var OS      = require('os');

var interfaces = OS.networkInterfaces();
var hostname   = OS.hostname();

function present(client) {
  client.publish('presence', new Buffer(JSON.stringify({
    hostname: hostname,
    interfaces: interfaces
  })));
}

function startPresentationTimer(client) {
  setInterval(present, 2000, client);
}

client.on('connect', function () {
  client.subscribe('presence');
  startPresentationTimer(client);
});

client.on('message', function (topic, message) {
  // The message will be a Buffer
  console.info(message.toString());
});
