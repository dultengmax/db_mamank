import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { NotificationService } from './notification.service';
import { stateNotif } from 'src/toko/toko/toko.model';
import { StateNotiv } from './notification.model';

@Controller('api/Notifications')
export class NotificationController {
  constructor(private Notifications: NotificationService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('createNotiv')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async CreateStore(
    @Body() Req: stateNotif,
    @Query('email') email: string,
  ): Promise<stateNotif> {
    return this.Notifications.AddNotification(Req, email);
  }
  @Post('editNotiv')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: stateNotif,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<stateNotif> {
    return this.Notifications.editNotification(Req, email, id);
  }

  @Post('deleteNotiv')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async deleteNotifications(
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<StateNotiv> {
    return this.Notifications.deleteNotification(email, id);
  }
}
