import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryDatabaseModule } from 'src/inMemoryDatabase/inMemoryDatabase.module';

@Module({
  imports: [InMemoryDatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
