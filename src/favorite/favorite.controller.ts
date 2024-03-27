import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async findAll() {
    return await this.favoriteService.findFavorites();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    return await this.favoriteService.addNewTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id') id: string) {
    return await this.favoriteService.removeTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    return await this.favoriteService.addNewAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id') id: string) {
    return await this.favoriteService.removeAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    return this.favoriteService.addNewArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id') id: string) {
    return await this.favoriteService.removeArtist(id);
  }
}
