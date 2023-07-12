import { PrismaService } from './../../prisma_service/PrismaService';
import { Injectable, ConflictException } from '@nestjs/common';

@Injectable()
export class StocksService {
  constructor(private prisma: PrismaService) {}

  async updateStockProduct(id: string, quantity: number) {
    const stock = await this.prisma.stock.findUnique({
      where: {
        productId: id,
      },
    });

    if (quantity < 0) {
      throw new ConflictException('Valor da quantidade menor que zero');
    }

    stock.quantity = quantity;

    await this.prisma.stock.update({
      where: {
        productId: id,
      },
      data: stock,
    });
  }
}
