import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy'
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUser(@Req() req: Request) {
    return req.user;
  }
}
