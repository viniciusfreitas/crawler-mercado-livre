const chai = require('chai');
const chaiHttp = require('chai-http');
// eslint-disable-next-line no-unused-vars
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Test Search route', () => {
  it('search should return an array of objects', (done) => {
    const payload = {'search': 'caneca', 'limit': 10};

    chai.request(server)
        .post('/search')
        .set('content-type', 'application/json')
        .send(payload)
        .end((err, res) => {
          if (err) done(err);
          res.body.should.have.a('array');
          res.body.forEach(function(item) {
            item.should.be.a('object');
          });
          done();
        });
  });
});

const checkValues = require('../methods/checkValeus');

describe('Check values method', () => {
  let item = {
    'name': 'caneca',
    'link': 'http://ml.com.br/276562',
    'price': 10.00,
    'store': 'Americanas',
    'state': 'Minas Gerais',
  };
  before(function() {
    item = checkValues(item);
  });

  it('checkValues should receive an object and return an object', (done) => {
    item.should.be.a('object');
    done();
  });

  it('checkValues should return an object with all propertys', (done) => {
    item.should.have.own.property('name');
    item.should.have.own.property('link');
    item.should.have.own.property('price');
    item.should.have.own.property('store');
    item.should.have.own.property('state');
    done();
  });

  // eslint-disable-next-line max-len
  it('Test property values', (done) => {
    item.name.should.have.be.a('string');
    item.link.should.have.a('string');
    item.price.should.have.a('number');
    done();
  });
});
