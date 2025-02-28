import express from 'express';
import { getProducts, createProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Rutas de productos
router.get('/', getProducts); // Público
router.post('/', authMiddleware, adminMiddleware, createProduct); // Solo admin
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct); // Solo admin

export default router;