const express = require('express');
const SerialPort = require('serialport').SerialPort;
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const port = new SerialPort({path: 'COM3',  baudRate: 9600 }); // Remplacez 'COM3' par le port de votre Arduino
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

app.get('/readSerial', (req, res) => {
  parser.once('data', (data) => {
    res.json({ data });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});