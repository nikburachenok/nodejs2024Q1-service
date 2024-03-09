import { HttpException, HttpStatus } from '@nestjs/common';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { validate } from 'uuid';

export const checkUUID = (id: string) => {
  if (!validate(id)) {
    throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
  }
};

export const checkRecordExists = (
  id: string,
  type: string,
  db: InMemoryDatabaseService,
) => {
  if (db.checkRecordExists(id, type) === -1) {
    throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
  }
};
