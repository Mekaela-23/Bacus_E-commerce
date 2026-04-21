const db = require("../config/db");
const { success, error } = require("../utils/response");
const Product = require("../model/productModel");

//GET ALL PRODUCTS
const index = async (req, res) => {
    try {
        const results = await Product.getAllProducts();
        return success(res, results, "Products retrieved successfully");
    } catch (err) {
        return error(res, err.message, 500);
    }      
}; 

//INSERT PRODUCT
const create = async (req, res) => {
   try {
    const result = await Product.createProduct(req.body);
    return success(res,result, "Product created successfully");
} catch (err) {
    return error(res, err.message, 500);
}   
};

//UPDATE PRODUCT
const update = async (req, res) => {
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);
   try {
    const result = await Product.updateProduct(req.params.id, req.body);
    return success(res,result, "Product updated successfully");
} catch (err) {
    return error(res, err.message, 500);
}   
};

const destroy = async (req, res) => {
    try {
        const result = await Product.deleteProduct(req.params.id);
        return success(res, result, "Product deleted successfully");
    } catch (err) {
        return error(res, err.message, 500);
    }   
};

module.exports = {
index,
create,
update,
destroy
};