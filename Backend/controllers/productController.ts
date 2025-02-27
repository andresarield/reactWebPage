import Product from '../models/ProductModel';
import { Request, Response } from 'express';

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Crear un nuevo producto (solo admin)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image } = req.body;

    // Crear el producto
    const product = new Product({ name, price, description, image });
    await product.save();

    res.status(201).json({ message: 'Producto creado exitosamente', product });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Eliminar un producto (solo admin)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Eliminar el producto
    await Product.findByIdAndDelete(id);

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};