import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SellersModule } from './sellers/sellers.module';
import typeOrmModuleAsyncOptions from './typeorm/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    AuthModule,
    SellersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
