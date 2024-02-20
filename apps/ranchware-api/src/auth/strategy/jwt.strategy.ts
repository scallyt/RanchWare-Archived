import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JWT') {
    constructor(
      private prisma: PrismaService,
      private configService: ConfigService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get('JWT_SECRET'),
      });
    }
  
    async validate(payload: { sub: number; username: string; email: string }) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (user) {
        delete user.hash;
        return user;
      }
    }
  }

function InjectRepository(User: any): (target: typeof JwtStrategy, propertyKey: undefined, parameterIndex: 0) => void {
    throw new Error('Function not implemented.');
}
