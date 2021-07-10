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
  additional: {
    type: Object,
    status: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
    note: {
      type: mongoose.Schema.Types.String,
      default: 'Some side note information about this product',
    },
  },
});

export interface Product extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  additional: Record<string, any>;
}
