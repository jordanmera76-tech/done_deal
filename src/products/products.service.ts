import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll() {
    return this.productModel.find().exec();
  }

  // NUEVO: Método para buscar un producto por ID en MongoDB
  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async create(createProductDto: any) {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async update(id: string, updateData: any) {
    const updated = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updated) throw new NotFoundException('Producto no encontrado');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Producto no encontrado');
    return { message: 'Producto eliminado exitosamente', product: deleted };
  }
}