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
    const rand = Math.floor(math.random() * count);
    const dep = await Product.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' })
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const dep = await Product.findById(req.params.id);
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
    const newProduct = new Product({ name: name })
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editEntry = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Product.findById(req.params.id);
    if(dep){
      dep.name = name;
      await dep.save();
      res.json(await Product.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};

exports.deleteEntry = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = Product.findById(req.params.id);
    if(dep){
      await Product.deleteOne({ _id: req.params.id }, { $set: { name: name }});
      res.json(await Product.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};