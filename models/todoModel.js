var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var todoSchema = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    active: {
      type: 'boolean',
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.plugin(slugs('name'));

module.exports = mongoose.model('todo', todoSchema);
