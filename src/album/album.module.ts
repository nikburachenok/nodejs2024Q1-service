import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryDatabaseModule } from 'src/inMemoryDatabase/inMemoryDatabase.module';

@Module({
  imports: [InMemoryDatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
