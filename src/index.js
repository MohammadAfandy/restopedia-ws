const WebSocket = require('ws')
const fetch = require('node-fetch');
require('dotenv').config();

const PORT = process.env.PORT;
const INTERVAL = process.env.INTERVAL;

const wss = new WebSocket.Server({ port: parseInt(PORT) });
let restaurants = [];

const init = async () => {
  const response = await fetch('https://restaurant-api.dicoding.dev/list');
  const data = await response.json();
  restaurants = data.restaurants;

  wss.on('connection', (ws) => {
    console.log('connected');
    setInterval(() => {
      const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
      ws.send(JSON.stringify(randomRestaurant));
    }, parseInt(INTERVAL));
  });
};

init();
