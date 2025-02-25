// src/pages/Admin.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Panel de Administración</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => handleDelete(product._id)}
              style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;