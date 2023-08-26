const Product = require("../models/Product");
const express = require("express");
const router = express.Router();

// get-all
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// add-Product
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json("Item added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// update-Product
router.put("/update-product", async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json("Item updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete-Product
router.delete("/delete-product", async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Item deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
