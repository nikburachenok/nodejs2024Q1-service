import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private db: InMemoryDatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.id = v4();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.createdAt = user.updatedAt = Date.now();
    return this.db.createNewUser(user);
  }

  findAll() {
    return this.db.getAllUsers();
  }

  findOne(id: string) {
    return this.db.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    this.db.removeUser(id);
    return `This action removes a #${id} user`;
  }
}
