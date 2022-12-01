import { PartialType } from '@nestjs/mapped-types';
import { SignUpSellerDto } from 'src/auth/dto';

export class UpdateSellerDto extends PartialType(SignUpSellerDto) {}
