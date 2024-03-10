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
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    return this.favoriteService.addNewTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favoriteService.removeTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favoriteService.addNewAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favoriteService.addNewArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favoriteService.removeArtist(id);
  }
}
