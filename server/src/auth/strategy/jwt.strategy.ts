import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller, Buyer } from 'src/typeorm/entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        @InjectRepository(Seller)
        private sellersRepository: Repository<Seller>,
        @InjectRepository(Buyer)
        private buyersRepository: Repository<Buyer>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({ role, sub }: JwtPayload) {
        let user: Buyer | Seller | null = null;
        if (role === 'buyer') {
            user = await this.buyersRepository.findOneBy({ id: sub });
        }
        else if (role === 'seller') {
            user = await this.sellersRepository.findOneBy({ id: sub });
        }
        if (!user) return null;

        return user;
    }
}