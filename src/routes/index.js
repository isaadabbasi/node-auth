const login = require('./auth/login.route');
const signup = require('./auth/signup.route');

module.exports = function registerRoutes(app) {
  app.use('/auth', [login, signup]);
};
