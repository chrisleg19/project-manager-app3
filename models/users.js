
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//NOTE about userSchema below: There's some nice validations and transformations in there, for example:

    // unique: Although technically not a validator, unique: true creates a unique index in the database which will trigger an error if violated.

    // trim: This transform causes Mongoose to trim spaces before and after the string before saving.

    // lowercase: This transform causes Mongoose to convert the string to lowercase before saving.

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    },
    timestamps: true,

    toJSON: {
        transform: function(doc, ret) {
          delete ret.password;
          return ret;
        }
    }
  });

module.exports = mongoose.model('User', userSchema);