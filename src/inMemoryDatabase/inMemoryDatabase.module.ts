import { Module } from '@nestjs/common';
import { InMemoryDatabaseService } from './inMemoryDatabase.service';

@Module({
  providers: [InMemoryDatabaseService],
  exports: [InMemoryDatabaseService],
})
export class InMemoryDatabaseModule {}
