const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, 
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true, 
      required: true,
      validate: {
        validator: function (email) {
          const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return emailRegex.test(email)
        }
      }
    },
    thoughts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'thought'
    }],
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})
const User = model('user', userSchema);

module.exports = User;
