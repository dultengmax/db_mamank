import { Module } from '@nestjs/common';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
