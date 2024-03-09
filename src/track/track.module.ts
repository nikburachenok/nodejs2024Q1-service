import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryDatabaseModule } from 'src/inMemoryDatabase/inMemoryDatabase.module';

@Module({
  imports: [InMemoryDatabaseModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
