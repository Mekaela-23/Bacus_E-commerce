const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

// INSERT PRODUCT
router.get("/products", productController.index);
router.post("/products", productController.create);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.destroy);


// router.post("/product", productController.createProduct);

module.exports = router;