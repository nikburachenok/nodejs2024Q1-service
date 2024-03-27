import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/db.service';
import { Album } from './entities/album.entity';
import { checkUUID } from 'src/utils/utils';
import { validate } from 'class-validator';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

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
    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId;
    return await this.db.album.create({ data: album });
  }

  async findAll() {
    return await this.db.album.findMany();
  }

  async findOne(id: string) {
    checkUUID(id);
    const album = await this.db.album.findUnique({ where: { id } });
    if (!album) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    return album;
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
    await this.findOne(id);

    const album: Album = new Album();
    album.id = id;
    album.name = updateAlbumDto.name;
    album.artistId = updateAlbumDto.artistId;
    album.year = updateAlbumDto.year;
    return await this.db.album.update({ where: { id }, data: album });
  }

  async remove(id: string) {
    checkUUID(id);
    await this.findOne(id);
    return await this.db.album.delete({ where: { id } });
  }
}
