import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';

export const checkUUID = (id: string) => {
  if (!validate(id)) {
    throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
  }
};
