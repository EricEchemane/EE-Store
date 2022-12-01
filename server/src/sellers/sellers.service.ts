import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, Seller } from 'src/typeorm/entities';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateSellerDto } from './dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getProducts(sellerId: string) {
    const products = await this.productsRepository.find({
      where: { seller: { id: sellerId } }
    });
    return products;
  }

  async findAll() {
    const sellers = await this.sellersRepository.find();
    return sellers;
  }

  async findOne(id: string) {
    try {
      const seller = await this.sellersRepository.findOneBy({ id });
      if (!seller) return null;

      delete (seller as any).hash;
      return seller;
    } catch (error) {
      if (error instanceof QueryFailedError &&
        error.message.startsWith('invalid input syntax for type uuid:')) {
        return null;
      }
      throw error;
    }
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
