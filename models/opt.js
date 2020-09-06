const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    opt: {
      type: Number
    }
  },
  {
    timestamps: false
  }
);


schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Opt', schema);