import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryDatabaseModule } from 'src/inMemoryDatabase/inMemoryDatabase.module';

@Module({
  imports: [InMemoryDatabaseModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
