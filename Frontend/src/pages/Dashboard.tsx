// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Productos Disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;