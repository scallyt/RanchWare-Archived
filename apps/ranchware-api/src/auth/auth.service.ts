import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private configService: ConfigService, private jwt: JwtService) {}

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

      delete user.hash;
      return this.signToken(user.id, user.email);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Credentials are taken.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException("User doesn't exists.");

    const isPasswordMatches = await argon2.verify(user.hash, dto.password);

    if (!isPasswordMatches)
      throw new BadRequestException("Password's doesnt matches.");

      return this.signToken(user.id, user.email);      
  }

  async signToken(
    id: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const secret = await this.configService.get<string>('JWT_SECRET');


    const payload = {
      sub: id,
      email,
    };

    const token = await this.jwt.sign(payload, {
      secret,
      expiresIn: '45m',
    });
    return {
      access_token: token,
    };
  }
}
