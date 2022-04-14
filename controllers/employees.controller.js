//employees.controller.js

const Employee = require('../models/employee.model');

exports.getAllEntrys = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomEntry = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand);
    if(!emp) res.status(404).json({ message: 'Not found' })
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewEntry = async (req, res) => {
  const { firstName, lastName, department, salary } = req.body;

  try {
    const newEmployee = new Employee({ firstName, lastName, department, salary })
    await newEmployee.save();
    res.json(await Employee.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editEntry = async (req, res) => {
  const { firstName, lastName, department, salary } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if(emp){
      emp.firstName = firstName;
      emp.lastName = lastName;
      emp.department = department;
      emp.salary = salary;
      await emp.save();
      res.json(await Employee.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const emp = Employee.findById(req.params.id);
    if(emp){
      await Employee.deleteOne({ _id: req.params.id });
      res.json(await Employee.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};