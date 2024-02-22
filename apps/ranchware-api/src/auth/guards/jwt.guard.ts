import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
export class JwtGuard extends AuthGuard('JWT') {
  constructor() {
    super();
  }
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (context.switchToHttp().getRequest()['authInfo']) {
      throw new UnauthorizedException('Invalid Token!');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}