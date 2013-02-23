var noble = require('./index');

console.log('noble');

setInterval(function() {
  console.log(10000);
}, 1000);


noble.on('scanStart', function() {
  console.log('on -> scanStart');
});

noble.on('scanStop', function() {
  console.log('on -> scanStop');
});

noble.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);
});

noble.on('peripheralDiscover', function(peripheral) {
  console.log('on -> peripheralDiscover: ');
  console.log(peripheral);

  noble.stopScanning();

  peripheral.on('connect', function() {
    console.log('on -> peripheral connect');
    this.updateRssi();
  });

  peripheral.on('connectFailure', function(reason) {
    console.log('on -> peripheral connect failure');
    console.log(reason);
  });

  peripheral.on('disconnect', function() {
    console.log('on -> peripheral disconnect');
  });

  peripheral.on('rssiUpdate', function(rssi) {
    console.log('on -> peripheral RSSI update ' + rssi);
    this.disconnect();
  });

  peripheral.connect();
});

noble.on('peripheralConnect', function(peripheral) {
  console.log('on -> peripheralConnect: ');
  console.log(peripheral);
});

noble.on('peripheralConnectFailure', function(peripheral, reason) {
  console.log('on -> peripheralConnectFailure: ');
  console.log(peripheral);
  console.log(reason);
});

noble.on('peripheralDisconnect', function(peripheral) {
  console.log('on -> peripheralDisconnect: ');
  console.log(peripheral);
});

noble.on('peripheralRssiUpdate', function(peripheral, rssi) {
  console.log('on -> peripheralRssiUpdate: ');
  console.log(peripheral);
  console.log(rssi);
});

noble.startScanning();
 