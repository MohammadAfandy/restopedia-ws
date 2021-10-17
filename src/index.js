const WebSocket = require('ws')
const fetch = require('node-fetch');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('connected');
  setInterval(() => {
    fetch('https://restaurant-api.dicoding.dev/list')
      .then((response) => response.json())
      .then(({ restaurants }) => {
        const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        ws.send(JSON.stringify(randomRestaurant));
      });

  }, 10 * 1000);
});
