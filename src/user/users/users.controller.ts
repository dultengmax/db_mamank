/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Post,
  Query,
  Redirect,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Connection } from '../connection/connection.service';
import { User } from '@prisma/client';
import {  UsersService } from './users.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { contactusersRequest, fotoProfileRequest, PasswordRequest, RegisterUserRequest, userNameRequest } from './users.model';
import { AuthGuard } from './users.guard';
import { Public } from '../decorator/public.decorator';


@Controller('/api/users')
export class UsersController {
  constructor(
    private connection: Connection,
    private user: UsersService,
  ) {}

  
  // ini contoh method yang mengembalikan semua data user
  @Post('register')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async getAllUsers(
    @Body() Req:RegisterUserRequest,
  ): Promise<RegisterUserRequest> {
    return this.user.register(Req);
  }

  // ini controller login 
  @Public()
  @Post('login')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async Login(
    @Body() Req:RegisterUserRequest,
  ): Promise<{access:string}> {
    return this.user.Login(Req);
  }

  // ini controller logout 
  @Post('logout')
  @UseGuards(AuthGuard)
  async Logout(@Request() req) {
    return req.logout();
  }

  // ini controller untuk menambahkan/mengedit fotoprofile
  @Post('fotoProfile')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async foto(
    @Body() Req:fotoProfileRequest,
  ): Promise<User> {
    return this.user.fotoprofile(Req);
  }

  // ini controller untuk menambahkan/mengedit username
  @Post('username')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async Username(
    @Body() Req:userNameRequest,
  ): Promise<User> {
    return this.user.editUserName(Req);
  }

  // ini controller untuk menambahkan/mengedit password
  @Post('editPassword')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async pass(
    @Body() Req:PasswordRequest,
  ): Promise<PasswordRequest> {
    return this.user.editPassword(Req);
  }

    // ini controller untuk menambahkan/mengedit contact

  @Post('editContact')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async contact(
    @Body() Req:contactusersRequest,
  ): Promise<contactusersRequest> {
    return this.user.contactUser(Req);
  }

 //ini controllers untuk menampilkan data users

 @Get('/find')
 @HttpCode(200)
 @Header('Content-Type', 'application/json')
 @UseFilters(ValidationFilter)
 FindUsers(
   @Query('id') id: string,
 ): Promise<User> {
   return this.user.FindUser(id);
 }
 //ini controllers untuk menampilkan data users

 @Get('/all')
 @HttpCode(200)
 @Header('Content-Type', 'application/json')
 @UseFilters(ValidationFilter)
 Finds(): Promise<User[]> {
   return this.user.FindUserMany();
 }

// /=======================================================////








  @Get('/konek')
  getConnectionName(): string {
    return this.connection.getName();
  }

  // ini contoh method redirect
@UseGuards(AuthGuard)
  @Get('/ddr')
  @Redirect()
  redirects(): HttpRedirectResponse {
    return {
      statusCode: 302,
      url: 'https://example.com',
    };
  }

  //   ini murni pake response nest js
  @Get('/sasa')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampelresponse(): Record<string, string> {
    return {
      data: 'dadadadadadad',
    };
  }

  //   ini untuk ng request menggunakan express method dan mengambil id
  //   @Get('/:id')
  //   getUserById(@Req() request:Request):string {
  //     return `${request.params.id}`;
  //   }
  @Get('/helli')
  async llo(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('greet') greet: string,
): Promise<string> {
    return `brooo ${name} ${email} ${greet}`;
  }
}
