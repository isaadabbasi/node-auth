const Express = require('express');
require('dotenv').config();
const preInitialization = require('./pre-init');
const registerRoutes = require('./src/routes');

const app = Express();

preInitialization(app);
registerRoutes(app);
// app.use(secureRoute({ global: true }));

const port = 4000;

app.listen(
  { port },
  () => void console.log(`🚀 - Server listening on Port : ${port}`)
);
