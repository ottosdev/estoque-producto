import { PrismaService } from './../../prisma_service/PrismaService';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(private service: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    const user = await this.service.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findOne(id: string) {
    const user = await this.service.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
