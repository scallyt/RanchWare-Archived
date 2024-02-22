import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtWsGuard implements CanActivate {
    constructor(
      private configService: ConfigService,
      private jwtService: JwtService,
    ) {}
  
    async canActivate(context: ExecutionContext) {
      const secret = this.configService.get('JWT_SECRET');
      const client = context.switchToWs().getClient();
      const token: string = client.handshake.headers.authorization.split(' ')[1];
  
      const verify = await this.jwtService.verifyAsync(token, { secret });
      if (!verify) {
        throw new UnauthorizedException('Invalid token!');
      }
  
      return true;
    }
  }