const db = require('../config/db');

exports.getAllProducts = async() => { // async - handle waiting tasks
    const [rows] = await db.query("SELECT * FROM tblproducts"); // await - handle for waiting time
    return rows;
};

exports.createProduct = async (data) => {
    const { product, category} = data;
    const [result] = await db.query(
        "INSERT INTO tblproducts (product, category) VALUES (?, ?)",
        [product, category]
    );
    return result;
};

exports.updateProduct = async (id, data) => {
    const { product, category} = data;
    const [result] = await db.query(
        "UPDATE tblproducts SET product = ?, category = ? WHERE id_product = ?",
        [product, category, id]
    );
    return result;
};

exports.deleteProduct = async (id) => {
    const [result] = await db.query(
        "DELETE FROM tblproducts WHERE id_product = ?",
        [id]
    );
    return result;
};