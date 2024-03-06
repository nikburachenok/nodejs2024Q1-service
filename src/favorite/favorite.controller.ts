import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  getHello(): string {
    return this.favoriteService.getHello();
  }
}
