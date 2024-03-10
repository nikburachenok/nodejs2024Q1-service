import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { Track } from './entities/track.entity';
import { v4 } from 'uuid';
import { checkRecordExists, checkUUID } from 'src/utils/utils';
import { validate } from 'class-validator';

@Injectable()
export class TrackService {
  constructor(private db: InMemoryDatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const errors = await validate(new CreateTrackDto(createTrackDto));
    if (errors.length > 0) {
      throw new HttpException('Wrong body', HttpStatus.BAD_REQUEST);
    }

    const track: Track = new Track();
    track.id = v4();
    track.name = createTrackDto.name;
    track.albumId = createTrackDto.albumId;
    track.artistId = createTrackDto.artistId;
    track.duration = createTrackDto.duration;
    return this.db.createNewTrack(track);
  }

  findAll() {
    return this.db.getAllTracks();
  }

  findOne(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'track', this.db, HttpStatus.NOT_FOUND);
    return this.db.getTrackById(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const errors = await validate(new UpdateTrackDto(updateTrackDto));
    if (errors.length > 0) {
      throw new HttpException('Wrong body', HttpStatus.BAD_REQUEST);
    }
    checkUUID(id);
    checkRecordExists(id, 'track', this.db, HttpStatus.NOT_FOUND);

    const track: Track = new Track();
    track.id = id;
    track.name = updateTrackDto.name;
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    track.duration = updateTrackDto.duration;
    return this.db.updateTrack(id, track);
  }

  remove(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'track', this.db, HttpStatus.NOT_FOUND);
    this.db.removeTrack(id);
    this.db.clearRemovedTrack(id);
    return `This action removes a #${id} track`;
  }
}
