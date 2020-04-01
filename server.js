const Express = require('express');
require('dotenv').config();
const preInitialization = require('./pre-init');
const authRoutes = require('./src/routes/auth');

const app = Express();

preInitialization(app);

// app.use(secureRoute({ global: true }));
app.use('', authRoutes);

const port = 4000;

app.listen(
  { port },
  () => void console.log(`🚀 - Server listening on Port : ${port}`)
);