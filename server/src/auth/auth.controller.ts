import { ClassSerializerInterceptor, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AuthService } from './auth.service';
import { SigninDto, SignUpBuyerDto, SignUpSellerDto } from './dto';

@UseInterceptors(ClassSerializerInterceptor)
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

    @HttpCode(HttpStatus.OK)
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

    @HttpCode(HttpStatus.OK)
    @Post('buyer/signin')
    async signinbuyer(@Body() dto: SigninDto) {
        const token = await this.authService.signinBuyer(dto);
        return token;
    }
}
