import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.model';
import { Model } from 'mongoose';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly productService: ProductsService,
  ) {}

  all(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async get(id: string): Promise<Category> {
    let category;
    try {
      category = this.categoryModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException(
        `Could not find the category with the id was ${id}`,
      );
    }
    return category;
  }

  add(name: string): Promise<Category> {
    const newCategory = new this.categoryModel({ name });
    return newCategory.save();
  }

  async assignProducts(categoryId: string, productIds: string[]) {
    const category = await this.get(categoryId);
    for (const productId of productIds) {
      const product = await this.productService.get(productId);
      product.category = categoryId;
      await product.save();
      category.products.push(product);
    }
    return new this.categoryModel(category).save();
  }
}
