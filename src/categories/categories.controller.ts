import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  all(): Promise<Category[]> {
    return this.categoryService.all();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Category> {
    return this.categoryService.get(id);
  }

  @Post()
  add(@Body('name') name: string): Promise<Category> {
    return this.categoryService.add(name);
  }

  @Post(':categoryId/products')
  assignProducts(
    @Body('productIds') productIds: string[],
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.assignProducts(categoryId, productIds);
  }
}
