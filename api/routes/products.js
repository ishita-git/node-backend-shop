const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const mongooose = require("mongoose");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET req to /products",
  });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongooose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    message: "Handling POST req to /products",
    createdProduct: product,
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc => {
    console.log(doc);
    res.status(200).json({doc})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  });
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product!",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "deleted product!",
  });
});

module.exports = router;
