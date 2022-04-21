const mongoose = require('mongoose');
const Employee = require('../employee.model');
const expect = require('chai').expect;

describe('Employee', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.log(err);
    }
  })

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: 'Professional Services', salary: '8000' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'John', lastName: 'Holland', department: 'Technical Support', salary: '4000' });
      await testEmpTwo.save();
    });
  
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "firstName" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda' });
      const expectedName = 'Amanda';
      expect(employee.firstName).to.be.equal(expectedName);
    });

    it('should return a proper document by "lastName" with "findOne" method', async () => {
      const employee = await Employee.findOne({ lastName: 'Holland' });
      const expectedName = 'Holland';
      expect(employee.lastName).to.be.equal(expectedName);
    });

    it('should return a proper document by "department" with "findOne" method', async () => {
      const employee = await Employee.findOne({ department: 'Technical Support' });
      const expectedName = 'Technical Support';
      expect(employee.department).to.be.equal(expectedName);
    });

    it('should return a proper document by "salary" with "findOne" method', async () => {
      const employee = await Employee.findOne({ salary: 4000 });
      const expectedName = 4000;
      expect(employee.salary).to.be.equal(expectedName);
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "save" method', async () => {
      const employee = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: 'Professional Services', salary: '8000' });
      await employee.save();
      const savedEmployee = await Employee.findOne({ firstName: 'Amanda' });
      expect(savedEmployee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: 'Professional Services', salary: '8000' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'John', lastName: 'Holland', department: 'Technical Support', salary: '4000' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'Amanda' }, { $set: { firstName: 'Dorothy' }});
      const updatedEmployee = await Employee.findOne({ firstName: 'Dorothy' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda' });
      employee.firstName = 'Dorothy';
      await employee.save();
    
      const updatedEmployee = await Employee.findOne({ firstName: 'Dorothy' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: 'Professional Services', salary: '8000' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'John', lastName: 'Holland', department: 'Technical Support', salary: '4000' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removedemployee = await Employee.findOne({ firstName: 'John' });
      expect(removedemployee).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      await employee.remove();
      const removedemployee = await Employee.findOne({ firstName: 'John' });
      expect(removedemployee).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany({});
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  
  });

});