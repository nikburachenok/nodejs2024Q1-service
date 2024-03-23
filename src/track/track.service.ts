import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/db.service';
import { Track } from './entities/track.entity';
import { checkUUID } from 'src/utils/utils';
import { validate } from 'class-validator';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  async create(createTrackDto: CreateTrackDto) {
    const errors = await validate(new CreateTrackDto(createTrackDto));
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

    const track: Track = new Track();
    track.name = createTrackDto.name;
    track.albumId = createTrackDto.albumId;
    track.artistId = createTrackDto.artistId;
    track.duration = createTrackDto.duration;
    return await this.db.track.create({ data: track });
  }

  async findAll() {
    return await this.db.track.findMany();
  }

  async findOne(id: string) {
    checkUUID(id);
    const track = await this.db.track.findUnique({ where: { id } });
    if (!track) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const errors = await validate(new UpdateTrackDto(updateTrackDto));
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

    const track: Track = new Track();
    track.id = id;
    track.name = updateTrackDto.name;
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    track.duration = updateTrackDto.duration;
    return this.db.track.update({ where: { id }, data: track });
  }

  async remove(id: string) {
    checkUUID(id);
    await this.findOne(id);
    return await this.db.track.delete({ where: { id } });
  }
}
