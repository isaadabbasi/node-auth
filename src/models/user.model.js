const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const defaultAvatarUrl = 'https://www.pinclipart.com/picdir/big/220-2209332_advanced-esprit-d-expertise-javascript-javascript-ninja-clipart.png'
const UserSchema = new Schema(
  {
    avatar: { default: defaultAvatarUrl, trim: true, type: String },
    contact: { required: true, trim: true, type: String },
    email: { required: true, trim: true, type: String, unique: true },
    password: { required: true, type: String },
    username: { required: true, trim: true, type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = Mongoose.model('user', UserSchema);

module.exports = UserModel;