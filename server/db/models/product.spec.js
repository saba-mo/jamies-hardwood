/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Sequelize Model', () => {
  let product;
  before(() => db.sync({force: true}));
  beforeEach(() => {
    product = {
      name: 'earrings',
      description: 'wooden earrings',
      quantity: 40,
      price: '24.22',
      imageUrl:
        'https://scontent.fdet1-1.fna.fbcdn.net/v/t1.0-9/48355230_2197053220325955_285086455796072448_n.jpg?_nc_cat=107&ccb=2&_nc_sid=0debeb&_nc_ohc=rcAYcAw-5VcAX9ofu4G&_nc_ht=scontent.fdet1-1.fna&oh=f62b16590bd0087ebb4caeb154646940&oe=6023BD24',
    };
  });
  afterEach(() => db.sync({force: true}));

  it('has fields name, description, quantity, price, imageUrl', async () => {
    product.notARealAttribute = 'does not compute';
    const savedProduct = await Product.create(product);
    expect(savedProduct.name).to.equal('earrings');
    expect(savedProduct.description).to.equal('wooden earrings');
    expect(savedProduct.quantity).to.equal(40);
    expect(savedProduct.price).to.equal('24.22');
    expect(savedProduct.imageUrl).to.equal(
      'https://scontent.fdet1-1.fna.fbcdn.net/v/t1.0-9/48355230_2197053220325955_285086455796072448_n.jpg?_nc_cat=107&ccb=2&_nc_sid=0debeb&_nc_ohc=rcAYcAw-5VcAX9ofu4G&_nc_ht=scontent.fdet1-1.fna&oh=f62b16590bd0087ebb4caeb154646940&oe=6023BD24'
    );
    expect(savedProduct.notARealAttribute).to.equal(undefined);
  });

  it('name cannot be null', async () => {
    const blankProduct = Product.build();
    try {
      await blankProduct.validate();
      throw Error('validation should have failed without title');
    } catch (err) {
      expect(err.message).to.contain('name cannot be null');
    }
  });

  it('quantity must be a positive integer', async () => {
    const invalidQuantityProduct = Product.build({
      name: 'earring',
      quantity: -4,
    });
    try {
      await invalidQuantityProduct.validate();
      throw Error('validation should have failed with invalid quantity');
    } catch (err) {
      expect(err.message).to.contain('Validation min on quantity failed');
    }
  });
});
