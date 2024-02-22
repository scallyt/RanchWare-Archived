import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUser } from './dto/getUser.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async getUser(dto: getUser) {
       const User = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        return User;
    }
}
