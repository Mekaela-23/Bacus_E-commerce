import React, { useEffect, useState } from 'react';
import api from "../api/axios";

export default function ProductList({ onEdit }) {
    const [products, setProducts] = useState([]);

    
    const fetchProducts = async () => {
            try {
                const res = await api.get("/api/v1/products");
                const data = res.data.data;
                setProducts(data);
            } catch (err) {
                console.error("Fetch Error:", err.response?.data || err.message);
                setProducts([]);
            }
};
useEffect(() => {
fetchProducts();
}, []);

const handDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
        await api.delete(`/api/v1/products/${id}`);
        alert("Product deleted successfully!");
        fetchProducts();
    } catch (err) {
        alert("Failed to delete product.");
    }
};

console.log("onEdit prop:", onEdit); 

return (
    <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #999' }}> {/* ✅ scrollable */}
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13, fontFamily: 'Arial, sans-serif' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #999', padding: '6px 10px', backgroundColor: '#ddd', textAlign: 'left' }}>ID</th> {/* ✅ ID una */}
                    <th style={{ border: '1px solid #999', padding: '6px 10px', backgroundColor: '#ddd', textAlign: 'left' }}>Product</th>
                    <th style={{ border: '1px solid #999', padding: '6px 10px', backgroundColor: '#ddd', textAlign: 'left' }}>Category</th>
                    <th style={{ border: '1px solid #999', padding: '6px 10px', backgroundColor: '#ddd', textAlign: 'left' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id_product} style={{ backgroundColor: '#fff' }}>
                        <td style={{ border: '1px solid #999', padding: '6px 10px' }}>{product.id_product}</td> {/* ✅ ID una */}
                        <td style={{ border: '1px solid #999', padding: '6px 10px' }}>{product.product}</td>
                        <td style={{ border: '1px solid #999', padding: '6px 10px' }}>{product.category}</td>
                        <td style={{ border: '1px solid #999', padding: '6px 10px' }}>
                            <button
                                onClick={() => onEdit(product)}
                                style={{ backgroundColor: '#ff9800', color: '#fff', border: 'none', padding: '4px 10px', cursor: 'pointer', borderRadius: 3, fontWeight: 'bold', marginRight: 5 }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handDelete(product.id_product)}
                                style={{ backgroundColor: '#e00050', color: '#fff', border: 'none', padding: '4px 10px', cursor: 'pointer', borderRadius: 3, fontWeight: 'bold' }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}