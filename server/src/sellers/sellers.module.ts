import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { Product, Seller } from 'src/typeorm/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SellersController],
  providers: [SellersService],
  imports: [TypeOrmModule.forFeature([Seller, Product])]
})
export class SellersModule {}
