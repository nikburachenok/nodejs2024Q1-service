import { Module } from '@nestjs/common';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { FavoriteController } from './favorite/favorite.controller';
import { TrackController } from './track/track.controller';
import { UserController } from './user/user.controller';
import { AlbumService } from './album/album.service';
import { ArtistService } from './artist/artist.service';
import { FavoriteService } from './favorite/favorite.service';
import { TrackService } from './track/track.service';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [
    AlbumController,
    ArtistController,
    FavoriteController,
    TrackController,
    UserController,
  ],
  providers: [
    AlbumService,
    ArtistService,
    FavoriteService,
    TrackService,
    UserService,
  ],
})
export class AppModule {}
