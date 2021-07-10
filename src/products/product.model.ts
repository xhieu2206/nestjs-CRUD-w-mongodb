import * as mongoose from 'mongoose';
import { Category } from '../categories/category.model';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

export interface Product extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
