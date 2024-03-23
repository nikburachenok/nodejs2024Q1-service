import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/db.service';
import { Artist } from './entities/artist.entity';
import { checkUUID } from 'src/utils/utils';
import { validate } from 'class-validator';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  async create(createArtistDto: CreateArtistDto) {
    const errors = await validate(new CreateArtistDto(createArtistDto));
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

    const artist: Artist = new Artist();
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    return await this.db.artist.create({ data: artist });
  }

  async findAll() {
    return await this.db.artist.findMany();
  }

  async findOne(id: string) {
    checkUUID(id);
    const artist = await this.db.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const errors = await validate(new UpdateArtistDto(updateArtistDto));
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

    const artist: Artist = new Artist();
    artist.id = id;
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return this.db.artist.update({ where: { id }, data: artist });
  }

  async remove(id: string) {
    checkUUID(id);
    await this.findOne(id);
    return await this.db.artist.delete({ where: { id } });
  }
}
