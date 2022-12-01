import { Controller, Get, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { UpdateSellerDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators';
import { Seller } from 'src/typeorm/entities';

@UseGuards(JwtAuthGuard)
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get('me')
  me(@GetUser() user: Seller) {
    return user;
  }

  @Get('me/products')
  async getProducts(@GetUser() seller: Seller) {
    const products = await this.sellersService.getProducts(seller.id);
    return { products, count: products.length };
  }

  @Get()
  async findAll() {
    const sellers = await this.sellersService.findAll();
    return { sellers, count: sellers.length };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const seller = await this.sellersService.findOne(id);
    if (seller) return { seller };
    throw new NotFoundException('Seller not found');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    const seller = await this.sellersService.update(id, updateSellerDto);
    return { seller };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }
}
