//products.routes.js

const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAllEntrys);
router.get('/products/random', ProductController.getRandomEntry); 
router.get('/products/:id', ProductController.getEntryById);
router.post('/products', ProductController.addNewEntry); 
router.put('/products/:id', ProductController.editEntry); 
router.delete('/products/:id', ProductController.deleteEntry); 

module.exports = router;
