import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';

import { SignUpSellerDto } from './dto/sign-up-seller.dto';
import { Buyer } from '@typeorm/entities/buyer.entity';
import { Seller } from '@typeorm/entities/seller.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Seller)
        private sellersRepository: Repository<Seller>,
        @InjectRepository(Buyer)
        private buyersRepository: Repository<Buyer>,
        private configService: ConfigService,
        private jwt: JwtService,
    ) {}

    async signupSeller(dto: SignUpSellerDto) {
        const hash = await argon.hash(dto.password);
        const seller = this.sellersRepository.create({
            ...dto,
            hash
        });
        await this.sellersRepository.save(seller);

        const payload = { sub: seller.id, email: seller.email };
        const token = await this.getToken(payload);

        return { access_token: token };
    }

    async getToken(payload: any) {
        const token = await this.jwt.signAsync(payload, {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: '15m'
        });
        return token;
    }
}
