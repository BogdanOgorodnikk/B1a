const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: {
      type: String
    },
    number: {
        type: Number
    },
    price: {
        type: Number,
        default: 0
    },
    data: {
        type: String
    },
    rosdb: {
      type: Number,
      default: 0
    },
    math: {
      type: Boolean,
      default: false
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }
  },
  {
    timestamps: true
  }
);


schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Pith', schema);