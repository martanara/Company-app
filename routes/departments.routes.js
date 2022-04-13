//departments.routes.js

const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAllEntrys);
router.get('/departments/:id', DepartmentController.getEntryById);
router.get('/departments/random', DepartmentController.getRandomEntry); 
router.post('/departments', DepartmentController.addNewEntry); 
router.put('/departments/:id', DepartmentController.editEntry); 
router.delete('/departments/:id', DepartmentController.deleteEntry); 

module.exports = router;
