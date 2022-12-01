import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto, UpdateSellerDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators';
import { Seller } from 'src/typeorm/entities';

@UseGuards(JwtAuthGuard)
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

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
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(+id);
  }
}
