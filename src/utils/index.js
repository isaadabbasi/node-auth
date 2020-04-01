const argon2 = require('argon2');
const DateFns = require('date-fns');
const fs = require('fs');
const JWT = require('jsonwebtoken');

const PRIVATE_KEY = fs.readFileSync('./certs/jwtRS256.key', 'utf8');
const PUBLIC_KEY = fs.readFileSync('./certs/jwtRS256.key.pub', 'utf8');

const TIME_FORMATS = {
  dateTimeDefault: 'dd MMM yyyy hh:mm:ss'
};

/**
 * @param {{global?: boolean}} config
 * @returns {function(): void}
 */

module.exports.secureRoute = function secureRoute(config = {}) {
  /**
   * @param {Request} request
   * @param {Object} response
   * @param { function():void } next
   */
  return function(request, response, next) {
    if (
      config.global &&
      unsecureRoutes.some(route =>
        new RegExp(`^${route}`, 'i').test(request.path)
      )
    )
      return next();

    const token = request.headers.authorization;
    if (!token) return response.sendStatus(401);
    else
      JWT.verify(
        token,
        PUBLIC_KEY,
        err => void (err ? response.sendStatus(401) : next())
      );
  };
};

module.exports.generateHash = function generateHash(pwdString) {
  const salt = Buffer.from(process.env.SEC_SALT);
  return argon2.hash(pwdString, { salt });
};

module.exports.signJWT = function signJWT() {
  const lifespan = 3;
  const jwtDetails = {
    expiresIn: DateFns.format(
      DateFns.addDays(new Date(), lifespan),
      TIME_FORMATS.dateTimeDefault
    ),
    signedAt: DateFns.format(new Date(), TIME_FORMATS.dateTimeDefault)
  };
  return JWT.sign(jwtDetails, PRIVATE_KEY, {
    algorithm: 'RS256',
    encoding: 'utf8',
    expiresIn: `${lifespan} days`,
    issuer: 'issuer'
  });
};
