import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { Album } from './entities/album.entity';
import { v4 } from 'uuid';
import { checkRecordExists, checkUUID } from 'src/utils/utils';
import { validate } from 'class-validator';

@Injectable()
export class AlbumService {
  constructor(private db: InMemoryDatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const errors = await validate(new CreateAlbumDto(createAlbumDto));
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
    const album: Album = new Album();
    album.id = v4();
    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId;
    return this.db.createNewAlbum(album);
  }

  findAll() {
    return this.db.getAllAlbums();
  }

  findOne(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'album', this.db, HttpStatus.NOT_FOUND);
    return this.db.getAlbumById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const errors = await validate(new UpdateAlbumDto(updateAlbumDto));
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
    checkRecordExists(id, 'album', this.db, HttpStatus.NOT_FOUND);

    const album: Album = new Album();
    album.id = id;
    album.name = updateAlbumDto.name;
    album.artistId = updateAlbumDto.artistId;
    album.year = updateAlbumDto.year;
    return this.db.updateAlbum(id, album);
  }

  remove(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'album', this.db, HttpStatus.NOT_FOUND);
    this.db.removeAlbum(id);
    this.db.clearRemovedAlbum(id);
    return `This action removes a #${id} album`;
  }
}
