import {
  Body,
  Controller,
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
import { extname } from 'path';

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
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<stateToko> {
    return this.toko.UpdateRute(Req, email, id);
  }

  @Post()
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
  uploadFile(
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
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
    };
  }

  @Get('findRute:id')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindToko(@Query('id') id: string): Promise<stateToko> {
    return this.toko.FindRute(id);
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
