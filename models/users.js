const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

userSchema.virtual('password')
  .get(function() { return null; })
  .set(function(value) {
    const hash = bcrypt.hashSync(value, 10);
    this.passwordHash = hash;
  });

module.exports = mongoose.model('User', userSchema);
