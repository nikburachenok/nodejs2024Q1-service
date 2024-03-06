import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll(@Res() res: Response): string {
    res.status(HttpStatus.OK).json([]);
    return this.albumService.getHello();
  }

  @Get(':id')
  getById(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).json();
    return ``;
  }

  @Post()
  create(/*@Body() createCatDto: CreateCatDto*/) {
    return '';
  }

  @Put(':id')
  update(/*@Param('id') id: string, @Body() updateCatDto: UpdateCatDto*/) {
    return ``;
  }

  @Delete(':id')
  remove(/*@Param('id') id: string*/) {
    return ``;
  }
}
