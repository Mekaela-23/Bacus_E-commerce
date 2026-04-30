import React, { useState } from 'react';
import ProductList from "./view";
import api from "../api/axios";

export default function ProductForm() {
    const [product, setProduct] = useState("");
    const [category, setCategory] = useState("");
    const [editId, setEditId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleEdit = (item) => {
        console.log("Edit Clicked:", item);
        setEditId(item.id_product);
        setProduct(item.product);
        setCategory(item.category);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await api.put(`/api/v1/products/${editId}`, { product, category });
                alert("Product updated successfully!");
                setEditId(null);
            } else {
            const res = await api.post("/api/v1/products", {
                product: product,
                category: category,
            });
            alert("Product added successfully!");
            console.log(res.data);
        }

            setProduct("");
            setCategory("");
            setRefreshKey(prev => prev + 1);

        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Failed to add product.");
        }
    };

    //     const response = await fetch("http://localhost:3300/api/v1/products", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //              product, 
    //              category 
    //         })
    //     });

    //     if (response.ok) {
    //         alert("Product added successfully!");
    //         setProduct("");
    //         setCategory("");
    //     } else {
    //         alert("Failed to add product.");
    //     }
    // };

    return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#e0e0e0',
        fontFamily: 'Arial, sans-serif'
    }}>
        {/* ✅ IISANG container lang */}
        <div style={{ 
            padding: 20, 
            width: 750, 
            border: '1px solid #ccc', 
            backgroundColor: '#f0f0f0', 
            maxHeight: 400, 
            overflowY: 'auto',
            boxSizing: 'border-box'
        }}>
            
            <h2 style={{ textAlign: 'center', fontSize: 20, marginBottom: 16 }}>SIMPLE CRUD APPLICATION</h2>

            <div style={{ display: 'flex', gap: 20 }}>
                
                <div style={{ flex: '0 0 220px' }}>
                    <form onSubmit={handleSubmit}>

                        <div style={{ marginBottom: 14 }}>
                            <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>Product Name</label>
                            <input
                                type="text"
                                placeholder=""
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                style={{ width: '100%', padding: '5px 8px', border: '2px solid #aaa', fontSize: 13, boxSizing: 'border-box' }}
                            />
                        </div>

                        <div style={{ marginBottom: 14 }}>
                            <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>Category</label>
                            <input
                                type="text"
                                placeholder=""
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: '100%', padding: '5px 8px', border: '2px solid #aaa', fontSize: 13, boxSizing: 'border-box' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button
                                type="submit"
                                style={{ backgroundColor: '#00bcd4', color: '#fff', border: 'none', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold', borderRadius: 3 }}
                            >
                                {editId ? "Update" : "Save"}
                            </button>
                            {editId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditId(null); setProduct(""); setCategory(""); }}
                                    style={{ backgroundColor: '#e91e63', color: '#fff', border: 'none', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold', borderRadius: 3 }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                    </form>
                </div>

                <div style={{ flex: 1 }}>
                    <ProductList key={refreshKey} onEdit={handleEdit}/>
                </div>

            </div>
        </div>
    </div>
);
}