const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(math.random() * count);
    const emp = await Employee.findOne().skip(rand);
    if(!emp) res.status(404).json({ message: 'Not found' })
    else res.json(emp);
  }
  catch {
    res.status(500).json({ message: err })
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  }
  catch {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  const { name } = req.body;

  try {
    const newEmployee = new Employee({ name: name })
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch(err){
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if(emp){
      emp.name = name;
      await emp.save();
      res.json({ message: 'OK '});
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
});

router.delete('/employees/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const emp = Employee.findById(req.params.id);
    if(emp){
      await Employee.deleteOne({ _id: req.params.id }, { $set: { name: name }});
      res.json({ message: 'OK '});
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
});

module.exports = router;
