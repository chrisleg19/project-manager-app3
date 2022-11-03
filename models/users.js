
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;
//The SALT_ROUNDS variable determines how much processing time it will take to perform the hash.
const SALT_ROUNDS = 6

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
        }
      }, {
        timestamps: true,
        toJSON: {
          transform: function(doc, ret) {
            delete ret.password;
            return ret;
          }
        }
      });
      

      
//function to check if the password has been modified, if yes, then the password will be encrypted again with bcrypt

//Mongoose pre-save hook (Mongoose middleware) that will hash the password anytime the password has changed

  //NOTE: The Mongoose pre-save hook (Mongoose middleware) also encrypts the password when it is first created:
        // this.password = await bcrypt.hash(this.password, SALT_ROUNDS);

  userSchema.pre('save', async function(next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  });



module.exports = mongoose.model('User', userSchema);