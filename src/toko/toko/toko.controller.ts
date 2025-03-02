import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Header,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TokoService } from './toko.service';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { stateToko } from './toko.model';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { promises as fs } from 'fs';

@Controller('rute')
export class TokoController {
  constructor(private toko: TokoService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('CreateRute')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async CreateStore(
    @Body() Req: stateToko,
    @Query('email') email: string,
  ): Promise<stateToko> {
    return this.toko.CreateRute(Req, email);
  }
  @Post('editRute')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: stateToko,
    @Query('id') id: string,
    @Query('id2') id2: string,
  ): Promise<stateToko> {
    return this.toko.UpdateRute(Req, id, id2);
  }

  @Post('CarouselImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFileCrsl(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.toko.addImageCarousel(file.filename);
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
    };
  }

  @Delete('editImager')
  async deleteFileCr(
    @Query('filename') filename: string,
    @Query('id') id: string,
  ) {
    const filePath = join(process.cwd(), 'uploads', filename);

    try {
      await fs.unlink(filePath);
      await this.toko.DeleteImagCarousel(filename, id); // Hapus entitas dari database
      return { message: 'File deleted successfully!' };
    } catch (error) {
      return { message: `${error} File not found or failed to delete.` };
    }
  }

  @Post('ruteImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Query('id')
    id: string,
  ) {
    await this.toko.addImageRute(file.filename, id);
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
    };
  }

  @Delete('editImage')
  async deleteFile(
    @Query('filename') filename: string,
    @Query('id') id: string,
  ) {
    const filePath = join(process.cwd(), 'uploads', filename);

    try {
      await fs.unlink(filePath);
      await this.toko.DeleteImageRute(filename, id); // Hapus entitas dari database
      return { message: 'File deleted successfully!' };
    } catch (error) {
      return { message: `${error} File not found or failed to delete.` };
    }
  }

  @Get('findRute')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindToko(@Query('id') id: string): Promise<stateToko> {
    return this.toko.FindRute(id);
  }
  @Get('findHarga')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindHarga(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<stateToko[]> {
    return this.toko.FindHarga(from, to);
  }
  @Get('findRuteall')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindTokoMany(): Promise<stateToko[]> {
    return this.toko.FindRuteMany();
  }
  @Get('findCarousel')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindCarousel() {
    return this.toko.FindImageCarousel();
  }

  @Get('ruteAll')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindTokoAll(): Promise<stateToko[]> {
    return this.toko.FindRuteMany();
  }
  @Get('searchRute')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async SearchToko(@Query('cat') cat: string): Promise<stateToko[]> {
    return this.toko.FindTokoSearch(cat);
  }
}
