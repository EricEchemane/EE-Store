import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities';
import { Repository } from 'typeorm';
import { CreateSellerDto, UpdateSellerDto } from './dto';

@Injectable()
export class SellersService {
  constructor(
    // @InjectRepository(Seller)
    // private sellersRepository: Repository<Seller>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  create(createSellerDto: CreateSellerDto) {
    return {
      message: 'This action adds a new seller',
      createSellerDto
    };
  }

  async getProducts(sellerId: string) {
    const products = await this.productsRepository.find({
      where: { seller: { id: sellerId } }
    });
    return products;
  }

  findAll() {
    return {
      message: `This action returns all sellers`
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return {
      message: `This action updates a #${id} seller`,
      updateSellerDto
    };
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
