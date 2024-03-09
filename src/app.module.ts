import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule, FavoriteModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
