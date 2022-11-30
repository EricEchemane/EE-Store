import { Module } from '@nestjs/common';
import { SellersService } from './service/sellers.service';
import { SellersController } from './controller/sellers.controller';

@Module({
  controllers: [SellersController],
  providers: [SellersService]
})
export class SellersModule {}
