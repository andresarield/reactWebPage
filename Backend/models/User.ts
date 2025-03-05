import mongoose, { Document } from 'mongoose';

// Interfaz para el modelo User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string; // 'user' o 'admin'
  googleId?: string; // Opcional
  facebookId?: string; // Opcional
  wishlist: mongoose.Types.ObjectId[]; // Referencia a productos
  cart: Array<{
    product: mongoose.Types.ObjectId; // Referencia a un producto
    quantity: number;
  }>;
}

// Esquema de Mongoose
const userSchema = new mongoose.Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }, // 'user' o 'admin'
  googleId: String,
  facebookId: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

// Exportar el modelo
export default mongoose.model<IUser>('User', userSchema);