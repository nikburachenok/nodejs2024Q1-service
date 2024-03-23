import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { UserResponse } from './entities/userResponse.entity';
import { checkUUID } from 'src/utils/utils';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

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

    if (
      await this.db.user.findUnique({ where: { login: createUserDto.login } })
    ) {
      throw new HttpException(
        'User with this login exists. Please, try to use another login',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.db.user.create({ data: createUserDto });
    return new UserResponse(user);
  }

  async findAll() {
    const userResponses = new Array<UserResponse>();
    (await this.db.user.findMany()).forEach((item) => {
      userResponses.push(new UserResponse(item));
    });
    return userResponses;
  }

  async findOne(id: string) {
    checkUUID(id);
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
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
    await this.findOne(id);

    if (
      updateUserDto.oldPassword ===
      (await this.db.user.findUnique({ where: { id } })).password
    ) {
      if (updateUserDto.oldPassword === updateUserDto.newPassword) {
        throw new HttpException(
          'The old password and the new password cannot by the same',
          HttpStatus.FORBIDDEN,
        );
      }
      const newUser = await this.db.user.update({
        where: { id },
        data: {
          version: { increment: 1 },
          password: updateUserDto.newPassword,
        },
      });
      return new UserResponse(newUser);
    } else {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    checkUUID(id);
    await this.findOne(id);
    this.db.user.delete({ where: { id } });
    return `This action removes a #${id} user`;
  }
}
