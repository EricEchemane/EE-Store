import { Injectable, NotFoundException } from '@nestjs/common';
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

      return seller;
    } catch (error) {
      if (error instanceof QueryFailedError &&
        error.message.startsWith('invalid input syntax for type uuid:')) {
        return null;
      }
      throw error;
    }
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    const seller = await this.sellersRepository.findOneBy({ id });
    if (!seller) throw new NotFoundException('seller not found');

    const updated = await this.sellersRepository.save({
      ...seller,
      ...updateSellerDto
    });

    return updated;
  }

  async remove(id: string) {
    try {
      const seller = await this.sellersRepository.findOneBy({ id });
      console.log(seller);

      if (!seller) throw new NotFoundException('Seller not found');
      return this.sellersRepository.remove(seller);

    } catch (error) {
      if (error instanceof QueryFailedError &&
        error.message.startsWith('invalid input syntax for type uuid:')) {
        throw new NotFoundException('Seller not found');
      }
      throw error;
    }
  }
}
