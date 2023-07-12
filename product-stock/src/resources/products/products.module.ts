import { PrismaService } from './../../prisma_service/PrismaService';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
