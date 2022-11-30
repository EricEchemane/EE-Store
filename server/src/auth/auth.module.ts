import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from '@typeorm/entities/buyer.entity';
import { Seller } from '@typeorm/entities/seller.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([Buyer, Seller]), JwtModule.register({})]
})
export class AuthModule {}
