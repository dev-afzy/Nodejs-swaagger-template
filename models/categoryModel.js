const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const slugs = require('mongoose-url-slugs');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: ObjectId,
    ref: 'Category',
  },
  ancestors: [
    {
      type: ObjectId,
      ref: 'Category',
    },
  ],
  children: [
    {
      type: ObjectId,
      ref: 'Category',
    },
  ],
});

CategorySchema.methods = {
  addChild: function (child) {
    var that = this;
    child.parent = this._id;
    child.ancestors = this.ancestors.concat([this._id]);

    return this.model('Category')
      .create(child)
      .then(function (child1) {
        that.children.push(child1._id);
        that.save();
        return child;
      });
  },
};

CategorySchema.plugin(slugs('name'));

module.exports = mongoose.model('Category', CategorySchema);
