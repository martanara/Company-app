const Employee = require('../employee.model');
const mongoose = require('mongoose');
const expect = require('chai').expect;

after(() => {
  mongoose.models = {};
});

describe('Employee', () => {

  it('should throw an error if args are missing', () => {
    
    const emp = new Employee({}); 

    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
      expect(err.errors.salary).to.exist;
    })
  });

  it('should throw an error if "firstName" is not a string with content', () => {
    const cases = [{}, [], ''];

    for(let firstName of cases) {
      const emp = Employee({ firstName });

      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    };
  });

  it('should throw an error if "departmen" is not a string with content', () => {
    const cases = [{}, [], ''];

    for(let department of cases) {
      const emp = Employee({ department });

      emp.validate(err => {
        expect(err.errors.department).to.exist;
      });
    };
  });

  it('should throw an error if "salary" is not a number', () => {
    const cases = [{}, [], 'abc', ''];

    for(let salary of cases) {
      const emp = Employee({ salary});

      emp.validate(err => {
        expect(err.errors.salary).to.exist;
      });
    };
  });

  it('should create a document if args are correct', () => {
    const emp = new Employee({ firstName: 'Hannah', lastName: 'James', department: 'IT', salary: 3000 })

    emp.validate(err => {
      expect(err).to.not.exist;
    })
  });
});