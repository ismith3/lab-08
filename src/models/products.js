'use strict';

// Where is our schema defined?
// How do we get it in here so we can run methods on it?

const schema = require('./schemas/products-schema');
const mongoose = require('mongoose');
let Product = mongoose.model('Product', schema);

class Products {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    if(_id) {
      return Product.find({ _id : _id });
    }
    return Product.find({});
  }

  create(record) {
    let newProduct = new Product(record);
    return newProduct.save();
  }

  update(_id, record) {
    return Product.updateOne({_id : _id}, record);
  }

  delete(_id) {
    return Product.deleteOne({_id : _id});
  }

}

module.exports = Products;
