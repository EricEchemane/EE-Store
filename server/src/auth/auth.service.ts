import { Buyer, Seller } from './../typeorm/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { SignUpSellerDto } from './dto/sign-up-seller.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';
import { SigninDto, SignUpBuyerDto } from './dto';
import { JwtPayload, AccessToken } from './types';

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

    async signupSeller(dto: SignUpSellerDto): Promise<AccessToken> {
        const hash = await argon.hash(dto.password);
        const seller = this.sellersRepository.create({
            ...dto,
            hash
        });
        await this.sellersRepository.save(seller);

        const payload: JwtPayload = { sub: seller.id, email: seller.email, role: "seller" };
        const token = await this.getToken(payload);

        return { access_token: token };
    }
    async signinSeller(dto: SigninDto): Promise<AccessToken> {
        const seller = await this.sellersRepository.findOneBy({ email: dto.email });
        if (!seller) throw new ForbiddenException('Invalid credentials');

        const passwordMatches = await argon.verify(seller.hash, dto.password);
        if (!passwordMatches) throw new ForbiddenException('Invalid credentials');

        const payload: JwtPayload = { sub: seller.id, email: seller.email, role: "seller" };
        const access_token = await this.getToken(payload);

        return { access_token };
    }

    async signupBuyer(dto: SignUpBuyerDto): Promise<AccessToken> {
        const hash = await argon.hash(dto.password);
        const buyer = this.buyersRepository.create({
            ...dto,
            hash
        });
        await this.buyersRepository.save(buyer);

        const payload: JwtPayload = { sub: buyer.id, email: buyer.email, role: "buyer" };
        const token = await this.getToken(payload);

        return { access_token: token };
    }
    async signinBuyer(dto: SigninDto): Promise<AccessToken> {
        const buyer = await this.buyersRepository.findOneBy({ email: dto.email });
        if (!buyer) throw new ForbiddenException('Invalid credentials');

        const passwordMatches = await argon.verify(buyer.hash, dto.password);
        if (!passwordMatches) throw new ForbiddenException('Invalid credentials');

        const payload: JwtPayload = { sub: buyer.id, email: buyer.email, role: "buyer" };
        const access_token = await this.getToken(payload);

        return { access_token };
    }

    async getToken(payload: JwtPayload) {
        const token = await this.jwt.signAsync(payload, {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: '1d'
        });
        return token;
    }
}
