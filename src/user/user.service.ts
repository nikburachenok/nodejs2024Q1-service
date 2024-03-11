import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';
import { UserResponse } from './entities/userResponse.entity';
import { checkRecordExists, checkUUID } from 'src/utils/utils';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private db: InMemoryDatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const errors = await validate(new CreateUserDto(createUserDto));
    if (errors.length > 0) {
      let error = '';
      errors.forEach((item) => {
        if (item.constraints) {
          for (const key in item.constraints) {
            error += `${item.constraints[key]}; `;
          }
        }
      });
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    if (this.db.getUserByLogin(createUserDto.login)) {
      throw new HttpException(
        'User with this login exists. Please, try to use another login',
        HttpStatus.FORBIDDEN,
      );
    }

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
    checkRecordExists(id, 'user', this.db, HttpStatus.NOT_FOUND);
    const user: User = this.db.getUserById(id);
    return new UserResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const errors = await validate(new UpdateUserDto(updateUserDto));
    if (errors.length > 0) {
      let error = '';
      errors.forEach((item) => {
        if (item.constraints) {
          for (const key in item.constraints) {
            error += `${item.constraints[key]}; `;
          }
        }
      });
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    checkUUID(id);
    checkRecordExists(id, 'user', this.db, HttpStatus.NOT_FOUND);

    if (updateUserDto.oldPassword === this.db.getUserPasswordById(id)) {
      if (updateUserDto.oldPassword === updateUserDto.newPassword) {
        throw new HttpException(
          'The old password and the new password cannot by the same',
          HttpStatus.FORBIDDEN,
        );
      }
      const newUser: User = this.db.updateUser(id, updateUserDto.newPassword);
      return new UserResponse(newUser);
    } else {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
  }

  remove(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'user', this.db, HttpStatus.NOT_FOUND);
    this.db.removeUser(id);
    return `This action removes a #${id} user`;
  }
}
