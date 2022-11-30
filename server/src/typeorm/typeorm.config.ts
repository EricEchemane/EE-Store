import { ConfigModule, ConfigService } from '@nestjs/config';
import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Buyer } from './entities/buyer.entity';
import { ProductPhoto } from './entities/misc/product-photo.entity';
import { ProductVariant } from './entities/misc/product-variant.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { Seller } from './entities/seller.entity';

const typeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: +configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DB_NAME'),
        entities: [Seller, Buyer, Product, ProductPhoto, ProductVariant, Order],
        synchronize: true,
    }),
};

export default typeOrmModuleAsyncOptions;
