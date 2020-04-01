const login = require('./login.route');
const signup = require('./signup.route');

module.exports = function registerRoutes(app) {
  app.use('/auth', [login, signup]);
};