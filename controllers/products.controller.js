//products.controller.js

const Product = require('../models/product.model');

exports.getAllEntrys = async (req, res) => {
  try {
    res.json(await Product.find());
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomEntry = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const product = await Product.findOne().skip(rand);
    if(!product) res.status(404).json({ message: 'Not found' })
    else res.json(product);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewEntry = async (req, res) => {
  const { name, client } = req.body;

  try {
    const newProduct = new Product({ name, client })
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editEntry = async (req, res) => {
  const { name, client } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if(product){
      product.name = name;
      product.client = client;
      await product.save();
      res.json(await Product.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    if(product){
      await Product.deleteOne({ _id: req.params.id });
      res.json(await Product.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};