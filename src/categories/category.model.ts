import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../products/product.model';

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    required: false,
  })
  products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
