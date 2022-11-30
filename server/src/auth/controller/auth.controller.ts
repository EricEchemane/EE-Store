import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AuthService } from '../service/auth.service';
import { SigninDto } from '../dto/sign-in.dto';
import { SignUpBuyerDto } from '../dto/sign-up-buyer.dto';
import { SignUpSellerDto } from '../dto/sign-up-seller.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('seller/signup')
    async signupSeller(@Body() dto: SignUpSellerDto) {
        try {
            const token = await this.authService.signupSeller(dto);
            return token;
        } catch (error) {

            if (error instanceof QueryFailedError
                && error.message.startsWith('duplicate key value violates unique constraint')) {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }
    }

    @Post('seller/signin')
    async signinSeller(@Body() dto: SigninDto) {
        const token = await this.authService.signinSeller(dto);
        return token;
    }

    @Post('buyer/signup')
    async signupbuyer(@Body() dto: SignUpBuyerDto) {
        try {
            const token = await this.authService.signupBuyer(dto);
            return token;
        } catch (error) {

            if (error instanceof QueryFailedError
                && error.message.startsWith('duplicate key value violates unique constraint')) {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }
    }

    @Post('buyer/signin')
    async signinbuyer(@Body() dto: SigninDto) {
        const token = await this.authService.signinBuyer(dto);
        return token;
    }
}
