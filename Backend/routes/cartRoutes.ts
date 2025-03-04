import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { addToCart, getCart, removeFromCart, clearCart } from '../controllers/cartController';

const router = express.Router();

router.get('/', authMiddleware, getCart); // Obtener el carrito
router.post('/', authMiddleware, addToCart); // Agregar al carrito
router.delete('/:productId', authMiddleware, removeFromCart); // Eliminar del carrito
router.delete('/', authMiddleware, clearCart); // Limpiar el carrito

export default router;