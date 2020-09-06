const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    number: {
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

module.exports = mongoose.model('Number', schema);