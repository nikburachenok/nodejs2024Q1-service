import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';
import { UserResponse } from './entities/userResponse.entity';
import { checkRecordExists, checkUUID } from 'src/utils/utils';

@Injectable()
export class UserService {
  constructor(private db: InMemoryDatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.id = v4();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.version = 1;
    user.createdAt = user.updatedAt = Date.now();
    const newUser: User = this.db.createNewUser(user);
    return new UserResponse(newUser);
  }

  findAll() {
    const userResponses = new Array<UserResponse>();
    this.db.getAllUsers().forEach((item) => {
      userResponses.push(new UserResponse(item));
    });
    return userResponses;
  }

  findOne(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'user', this.db);
    const user: User = this.db.getUserById(id);
    return new UserResponse(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    checkUUID(id);
    checkRecordExists(id, 'user', this.db);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'user', this.db);
    this.db.removeUser(id);
    return `This action removes a #${id} user`;
  }
}
