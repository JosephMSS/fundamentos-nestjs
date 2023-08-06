import { Injectable } from '@nestjs/common';
import { Product } from './entities';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 0,
      name: 'Camisa 1',
      description: 'lorem lorem lorem',
      price: 1000,
      stock: 100,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
    {
      id: 1,
      name: 'Camisa 2',
      description: 'lorem lorem lorem',
      price: 1000,
      stock: 100,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];
  private counterId = this.products.length;
  getId() {
    return this.counterId++;
  }
  findAll() {
    return this.products;
  }
  finOne(id: number) {
    return this.products.find((p) => p.id === id);
  }
  create(payload: any) {
    const newProduct = {
      id: this.getId(),
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(payload: any, id: number) {
    const product = this.finOne(id);

    if (!product) {
      return null;
    }
    const productIndex = this.products.findIndex((p) => p.id === product.id);
    const updatedProduct = {
      ...product,
      ...payload,
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }
  delete(id: number) {
    const product = this.finOne(id);
    if (!product) {
      return null;
    }
    const productIndex = this.products.findIndex((p) => p.id === product.id);
    this.products.splice(productIndex, 1);
    return this.products;
  }
}
