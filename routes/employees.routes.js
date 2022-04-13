//employees.routes.js

const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAllEntrys);
router.get('/employees/random', EmployeeController.getRandomEntry); 
router.get('/employees/:id', EmployeeController.getEntryById);
router.post('/employees', EmployeeController.addNewEntry); 
router.put('/employees/:id', EmployeeController.editEntry); 
router.delete('/employees/:id', EmployeeController.deleteEntry); 

module.exports = router;