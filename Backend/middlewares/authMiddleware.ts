import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

// Middleware para verificar el token
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.user = user as IUser; // Adjuntar el usuario a la solicitud con el tipo correcto
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware para verificar si el usuario es admin
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador' });
  }
  next();
};