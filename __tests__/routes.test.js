'use strict';

const {server} = require('../src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);
let testID;

describe('Categories', () => {
  it('can POST new records to categories', () => {
    return mockRequest
      .post('/api/v1/categories')
      .send({name: 'test'})
      .expect(200)
      .then(res => {
        expect(JSON.parse(res.text).name).toEqual('test');
      });
  });

  it('can GET all data from categories', () => {
    return mockRequest
      .get('/api/v1/categories')
      .expect(200)
      .then(res => {
        let parsed = JSON.parse(res.text);
        testID = parsed.results[0]._id;
        expect(parsed.results[0].name).toEqual('test');
      });
  });

  it('can PUT updated data in categories', () => {
    return mockRequest
      .put(`/api/v1/categories/${testID}`)
      .send({name: 'put test'})
      .expect(200)
      .then(res => {
        expect(JSON.parse(res.text)).toEqual({n: 1, nModified: 1, ok: 1});
      });
  });

  it('can DELETE a record from categories', () => {
    return mockRequest
      .delete(`/api/v1/categories/${testID}`)
      .expect(200)
      .then(res => {
        expect(JSON.parse(res.text)).toEqual({deletedCount: 1, n: 1, ok: 1});
      });
  });
});

describe('Products', () => {
  let productID;
  it('can POST new records to products', () => {
    return mockRequest
      .post('/api/v1/products')
      .send({
        category_id: testID,
        price: 20,
        quantity_in_stock: 50,
      })
      .expect(200)
      .then(res => {
        expect(JSON.parse(res.text).price).toEqual(20);
      });
  });

  it('can GET all data from products', () => {
    return mockRequest
      .get('/api/v1/products')
      .expect(200)
      .then(res => {
        let parsed = JSON.parse(res.text);
        productID = parsed.results[0]._id;
        expect(parsed.results[0].price).toEqual(20);
      });
  });

  it('can PUT updated data in products', () => {
    return mockRequest
      .put(`/api/v1/products/${productID}`)
      .send({
        category_id: testID,
        price: 30,
        quantity_in_stock: 50,
      })
      .expect(200)
      .then(res => {
        expect(JSON.parse(res.text)).toEqual({n: 1, nModified: 1, ok: 1});
      });
  });

  it('can DELETE a record from products', () => {
    return mockRequest
      .delete(`/api/v1/products/${productID}`)
      .expect(200)
      .then(res => {
        expect(JSON.parse(res.text)).toEqual({deletedCount: 1, n: 1, ok: 1});
      });
  });
});