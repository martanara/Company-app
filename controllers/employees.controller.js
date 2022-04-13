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
    const rand = Math.floor(math.random() * count);
    const dep = await Employee.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' })
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewEntry = async (req, res) => {
  const { name } = req.body;

  try {
    const newEmployee = new Employee({ name: name })
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editEntry = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Employee.findById(req.params.id);
    if(dep){
      dep.name = name;
      await dep.save();
      res.json(await Employee.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};

exports.deleteEntry = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = Employee.findById(req.params.id);
    if(dep){
      await Employee.deleteOne({ _id: req.params.id }, { $set: { name: name }});
      res.json(await Employee.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};