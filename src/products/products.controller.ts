import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
    @Body('image') image?: string,
  ): Promise<Product> {
    return this.productService.addProduct(title, desc, price, image);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.get(id.toString());
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
    @Body('image') image?: string,
  ): Promise<Product> {
    return this.productService.updateProduct(id, title, desc, price, image);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.removeProduct(id);
  }
}
