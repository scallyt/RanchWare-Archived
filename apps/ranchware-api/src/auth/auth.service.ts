import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  async signUp(dto: SignUpDto) {
    const hashPassword = await argon2.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash: hashPassword,
        },
      });

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Credentials are taken.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  signIn(dto: SignInDto) {}
}
