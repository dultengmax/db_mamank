/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import {
  contactusersRequest,
  fotoProfileRequest,
  PasswordRequest,
  RegisterUserRequest,
  userNameRequest,
} from './users.model';
import { ContactScema, PasswordScema, UserSchema } from './users.validation';
import { JwtService } from '@nestjs/jwt';

// service user register
@Injectable()
export class UsersService {
  constructor(
    private PrismaService: PrismaService,
    private validate: ValidationService,
    private jwtService: JwtService
  ) {}
  async register(reg: RegisterUserRequest): Promise<RegisterUserRequest> {
    const result = this.validate.validate(UserSchema, reg);
    const dataUser = await this.PrismaService.user.count({
      where: { userName: result.userName  },
    });
    if (dataUser !== 0) {
      throw new HttpException('Username already exists', 406);
    }
    const dataEmail = await this.PrismaService.user.count({
      where: { email: result.email  },
    });
    if (dataEmail !== 0) {
      throw new HttpException('email already exists', 407);
    }
    const hash = await bcrypt.hash(result.password, 10);
    const users = await this.PrismaService.user.create({
      data: {
        userName: result.userName,
        password: hash,
        email: result.email,
      },
    });

    return users;
  }
  async Login(login: RegisterUserRequest): Promise<{access:string}> {
    const FormSchema = z.object({
      email: z
        .string()
        .min(1, {
          message: 'email harus di isi',
        })
        .email({ message: 'email harus sesuai' }),
      password: z.string().min(8, {
        message: 'password harus di isi',
      }),
    });
    const result = await this.validate.validate(FormSchema, login);

    const user = await this.PrismaService.user.findUnique({
      where: {
        email: result.email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const isMatch = await bcrypt.compare(login.password, user.password);
    if (!isMatch) {
      throw new HttpException('password not match', 401);
    }
    
    const payload = { sub: user.id, username: user.userName };

    return {access: await this.jwtService.signAsync(payload),};
  }
  async fotoprofile(foto: fotoProfileRequest): Promise<User> {
    const users = await this.PrismaService.user.findUnique({
      where: {
        email: foto.email,
      },
    });

    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const addFoto = await this.PrismaService.user.update({
      where: {
        email: users.email,
      },
      data: {
        image: foto.image,
      },
    });
    return addFoto;
  }
  async editUserName(user: userNameRequest): Promise<User> {
    const data = await this.PrismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!data) {
      throw new HttpException('User not found', 404);
    }
    const updateUser = await this.PrismaService.user.update({
      data: {
        userName: user.userName,
      },
      where: {
        email: user.email,
      },
    });

    return updateUser;
  }
  async editPassword(users: PasswordRequest): Promise<PasswordRequest> {
    const result = this.validate.validate(PasswordScema, users);
    const data = await this.PrismaService.user.findUnique({
      where: {
        email: result.email,
      },
    });
    console.log(data.password);
    if (!data) {
      throw new HttpException('User not found', 404);
    }
    console.log('ini password hash', result.password);
    const match = await bcrypt.compare(result.password, data.password);

    if (!match) {
      throw new HttpException('Password not match', 403);
    }
    const hash = await bcrypt.hash(result.newPassword, 10);
    const updateUser = await this.PrismaService.user.update({
      data: {
        password: hash,
      },
      where: {
        email: users.email,
      },
    });
    return updateUser;
  }
  async contactUser(data: contactusersRequest): Promise<User> {
    const result = this.validate.validate(ContactScema, data);
    const users = await this.PrismaService.user.findUnique({
      where: {
        email: result.email,
      },
    });
    if(!users){
      throw new HttpException('User not found', 404);
    }
    const contacts= await this.PrismaService.user.update({
      data:{
        contact:result.contact
      },
      where:{
        email:result.email,
      }
    })

    return contacts;
  }
  async FindUserMany(): Promise<User[]> {
    try{
      const users = await this.PrismaService.user.findMany({
   
      });
      if(!users){
        throw new HttpException('User not found', 404);
      }
  
      return users;
    }catch(error){
      console.error(error);
      throw new HttpException('Internal Server Error', 500);
    }

  }
  async FindUser(id:string): Promise<User> {
    try{
      const users = await this.PrismaService.user.findUnique({
        where: {
          id: id,
        },
      });
      if(!users){
        throw new HttpException('User not found', 404);
      }
  
      return users;
    }catch(error){
      console.error(error);
      throw new HttpException('Internal Server Error', 500);
    }

  }
}
export { RegisterUserRequest };
