var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
const { ObjectId } = Schema.Types;
var slugs = require('mongoose-url-slugs');

var ProductSchema = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    price: {
      type: 'number',
      required: true,
    },
    categories: {
      type: ObjectId,
      required: true,
      ref: 'category',
      index: true,
    },
    headersections: {
      type: ObjectId,
      required: true,
      ref: 'category',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(slugs('name'));

module.exports = mongoose.model('product', ProductSchema);
