import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  addProduct(title: string, desc: string, price: number, image?) {
    const newProd = new this.productModel({
      title,
      description: desc,
      price,
      image,
    });
    return newProd.save();
  }

  getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async get(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException(
        `Could not find the product with the id was ${id}`,
      );
    }
    return product;
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
    image?: string,
  ): Promise<Product> {
    const updateProduct = await this.get(id);
    updateProduct.title = title;
    updateProduct.description = description;
    updateProduct.price = price;
    updateProduct.image = image;
    return updateProduct.save();
  }

  async removeProduct(id: string): Promise<Product> {
    const product = await this.get(id);
    return product.remove();
  }
}
