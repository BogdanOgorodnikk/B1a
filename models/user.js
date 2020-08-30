const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isLogist: {
      type: Boolean,
      default: false
    },
    isAccountant: {
      type: Boolean,
      default: false
    },
    isAccountantnotnal: {
      type: Boolean,
      default: false
    },
    isManager: {
      type: Boolean,
      default: false
    },
    ban: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', schema);