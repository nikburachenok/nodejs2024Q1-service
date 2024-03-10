import { HttpException, HttpStatus } from '@nestjs/common';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { validate } from 'uuid';
import { validate as validateDto } from 'class-validator';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

export const checkUUID = (id: string) => {
  if (!validate(id)) {
    throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
  }
};

export const checkRecordExists = (
  id: string,
  type: string,
  db: InMemoryDatabaseService,
  status: HttpStatus,
) => {
  if (db.checkRecordExists(id, type) === -1) {
    throw new HttpException('Record does not exist', status);
  }
};

export const validateBody = async (
  dto:
    | CreateAlbumDto
    | CreateArtistDto
    | CreateTrackDto
    | CreateUserDto
    | UpdateAlbumDto
    | UpdateArtistDto
    | UpdateTrackDto
    | UpdateUserDto,
) => {
  const errors = await validateDto(dto);
  if (errors.length > 0) {
    throw new HttpException('Wrong body', HttpStatus.BAD_REQUEST);
  }
};
