const chai = require('chai');
const chaiHttp = require('chai-http');
// eslint-disable-next-line no-unused-vars
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Test Search route', () => {

  it('/search should return status 200 ', (done) => {
    const payload = {'search': 'caneca', 'limit': 10};

    chai.request(server)
        .post('/search')
        .set('content-type', 'application/json')
        .send(payload)
        .end((err, res) => {
          // if (err) done(err);
          res.should.have.status(200);
          done();
        });
  });

  it('/search should return status 200 ', (done) => {
    const payload = {'search': 'caneca', 'limit': 10};

    chai.request(server)
        .post('/search')
        .set('content-type', 'application/json')
        .send(payload)
        .end((err, res) => {
          // if (err) done(err);
          res.body.should.have.a('array');
          done();
        });
  });

  it('test 3', (done) => {
    done();
  });
});
