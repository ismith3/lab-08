'use strict';

const schema = require('./schemas/categories-schema');
const mongoose = require('mongoose');
let Category = mongoose.model('Category', schema);

class Categories {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    if(_id) {
      return Category.find({ _id : _id });
    }
    return Category.find({});
  }

  create(record) {
    let newCategory = new Category(record);
    return newCategory.save();
  }

  update(_id, record) {
    return Category.updateOne({_id : _id}, record);
  }

  delete(_id) {
    return Category.deleteOne({_id : _id});
  }

}

module.exports = Categories;
