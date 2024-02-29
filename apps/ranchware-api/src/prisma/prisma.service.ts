import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: "mysql://admin:root@localhost:3306/ranchware",
                },
            },
        });
    
    
    }
    async cleanDb() {
        await this.$transaction([
          this.user.deleteMany(),
        ]);
      }
}
