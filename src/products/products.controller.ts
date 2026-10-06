import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body);
  }

  // NUEVO: Endpoint para actualizar (editar)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  // NUEVO: Endpoint para borrar
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}