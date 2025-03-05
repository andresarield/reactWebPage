import User from '../models/User';
import { Request, Response } from 'express';

export const getCart = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingItem = user.cart.find((item: any) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filtrar el carrito para eliminar el producto
    user.cart = user.cart.filter((item: any) => item.product.toString() !== productId);

    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar del carrito' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Limpiar el carrito
    user.cart = [];
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al limpiar el carrito' });
  }
};