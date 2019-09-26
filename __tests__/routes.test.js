'use strict';

const {server} = require('../src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('GET', () => {
  it('can get all data from categories', () => {
    return mockRequest
      .get('/categories')
      .expect(200)
      .expect([]);
  });
});