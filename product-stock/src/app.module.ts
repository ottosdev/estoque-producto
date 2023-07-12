import { Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { PrismaService } from './prisma_service/PrismaService';
import { ProductsModule } from './resources/products/products.module';
import { StocksModule } from './resources/stocks/stocks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ProductsModule, StocksModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
