import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from '../dto/create-seller.dto';
import { UpdateSellerDto } from '../dto/update-seller.dto';

@Injectable()
export class SellersService {
  create(createSellerDto: CreateSellerDto) {
    return {
      message: 'This action adds a new seller',
      createSellerDto
    };
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
