const argon2 = require('argon2');

const UserModel = require('../models/user.model');
const { generateHash } = require('../utils')

class UserRespository {
  constructor(){}
  find(query = {}, projection = { password: 0 }) {
    return UserModel.find(query, projection).exec();
  }
  findOne(query = {}) {
    return UserModel.findOne(query).exec();
  }
  async save(data = {}) {
    const hash = await generateHash(data.password);
    const document = new UserModel({ ...data, password: hash });
    return document.save();
  }
  verify(creds = {}) {
    return new Promise((resolve, reject) => {
      let query;

      if (creds.username) query = UserModel.findOne({ username: creds.username });
      else if (creds.email) query = UserModel.findOne({ email: creds.email });
      else if (creds._id) query = UserModel.findById(creds._id);

      if (!query) reject(new Error("Invalid Query"));

      query
        .exec()
        .then(async ({ _doc: user } = {}) => {
          if (!user) return reject(new Error("Invaild Credentials"));
          const verified = await argon2.verify(user.password, creds.password);
          // ! Must not be sent on FE
          delete user.password;

          return verified ? resolve(user) : reject(new Error("Invaild Credentials"));
        })
        .catch(() => void reject(new Error("Not Found")));
    });
  }
}

module.exports = new UserRespository();
