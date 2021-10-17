const WebSocket = require('ws')
const fetch = require('node-fetch');
require('dotenv').config();

const PORT = process.env.PORT;
const INTERVAL = process.env.INTERVAL;

const wss = new WebSocket.Server({ port: parseInt(PORT) });

wss.on('connection', (ws) => {
  console.log('connected');
  setInterval(() => {
    fetch('https://restaurant-api.dicoding.dev/list')
      .then((response) => response.json())
      .then(({ restaurants }) => {
        const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        ws.send(JSON.stringify(randomRestaurant));
      });

  }, INTERVAL);
});
