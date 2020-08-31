const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    order: {
      type: Number,
      default: null
    },
    firms: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    opt: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    },
    number: {
      type: Number,
      default: 0
    },
    delivery: {
      type: Number,
      default: 0
    },
    deliverynotnal: {
      type: Number,
      default: 0
    },
    nal: {
      type: Number,
      default: 0
    },
    notnal: {
      type: Number,
      default: 0
    },
    pricenotnal: {
      type: Number,
      default: 0
    },
    deltadebt: {
      type: Number,
      default: 0
    },
    deltadebtnal: {
      type: Number,
      default: 0
    },
    deltatonnal: {
      type: Number,
      default: 0
    },
    deltatonnotnal: {
      type: Number,
      default: 0
    },
    data: {
      type: Date,
      default: Date.now
    },
    datal: {
      type: String
    },
    debt: {   //SUMA
        type: Number,
        default: 0
    },
    debts: {  //BORG
      type: Number,
      default: 0
    },
    sumsell: {
      type: Number,
      default: 0
    },
    count: {
      type: Boolean,
      default: false
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: false
  }
);


schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Product', schema);