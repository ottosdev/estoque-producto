import { PrismaService } from './../../prisma_service/PrismaService';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const productExits = await this.prisma.product.findUnique({
      where: {
        name: createProductDto.name,
      },
    });

    if (productExits) {
      throw new ConflictException('Produto ja cadastrado');
    }

    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        stock: {
          create: {
            quantity: createProductDto.stock.quantity,
          },
        },
      },
      include: {
        stock: true,
      },
    });

    return product;
  }

  async findByid(id: string) {
    const productExits = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        stock: true,
      },
    });

    if (!productExits) {
      throw new NotFoundException('Nenhum produto encontrado');
    }

    return productExits;
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        stock: true,
      },
    });
    return products;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ConflictException('Produto nao existe');
    }

    if (product.name === updateProductDto.name) {
      throw new ConflictException('Produto ja existe no estoque');
    }

    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        stock: {
          update: {
            quantity: updateProductDto.quantity,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        stock: true,
      },
    });

    await this.prisma.stock.delete({
      where: { id: product.stock.id },
    });

    await this.prisma.product.delete({
      where: {
        id: product.id,
      },
    });
  }
}
