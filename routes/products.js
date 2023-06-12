const express = require('express');
const { ProductModel, validateProduct } = require('../models/productModel');

const router = express.Router();

router.get('/', async (req, res) => {
  let perPage = Number(req.query.perPage) || 12;
  let page = Number(req.query.page) || 1;
  let sort = req.query.sort || '_id';
  let reverse = req.query.reverse == 'true' ? -1 : 1;
  let search = req.query.s;
  let searchExp = new RegExp(search, 'i');
  try {
    const products = await ProductModel.find({ name: searchExp })
      .limit(perPage)
      .skip(perPage * (page - 1))
      .sort({ [sort]: reverse });
    if (!products) return res.sendStatus(400);

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get('/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;
    const product = await ProductModel.findOne({ _id: productID });

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post('/', async (req, res) => {
  const validBody = validateProduct(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const product = new ProductModel(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
