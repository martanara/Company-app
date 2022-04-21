const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
  mongoose.models = {};
});

describe('Department', () => {

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); 

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    })
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];

    for(let name of cases) {
      const dep = Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    };
  });

  it('should throw an error if "name"\'s length is shorter than 2 or lnger than 20', () => {
    const cases = ['I', 'Gravitational Astrophysics Deparment'];

    for(let name of cases) {
      const dep = Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    };
  });

  it('should create a document if "name" arg is correct', () => {
    const cases = ['IT', 'Marketing', 'Technical Support'];

    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err).to.not.exist;
      })
    }
  });

});