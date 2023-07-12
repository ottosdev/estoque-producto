import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma_service/PrismaService';

import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(username: string, password: string): Promise<Auth> {
    // Step 1: Fetch a user with the given email

    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(
        `Nenhum usuario encontrado com o nome: ${username}`,
      );
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario ou senha invalidos');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: {
        username: user.username,
      },
    };
  }
}
