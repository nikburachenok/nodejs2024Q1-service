import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { InMemoryDatabaseModule } from 'src/inMemoryDatabase/inMemoryDatabase.module';

@Module({
  imports: [InMemoryDatabaseModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
