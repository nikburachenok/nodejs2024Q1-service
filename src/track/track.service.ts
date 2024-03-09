import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { Track } from './entities/track.entity';
import { v4 } from 'uuid';
import { checkRecordExists, checkUUID } from 'src/utils/utils';

@Injectable()
export class TrackService {
  constructor(private db: InMemoryDatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const track: Track = new Track();
    track.id = v4();
    track.name = createTrackDto.name;
    track.albumId = track.albumId;
    track.artistId = track.artistId;
    track.duration = track.duration;
    return this.db.createNewTrack(track);
  }

  findAll() {
    return this.db.getAllTracks();
  }

  findOne(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'track', this.db);
    return this.db.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    checkUUID(id);
    checkRecordExists(id, 'track', this.db);
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'track', this.db);
    this.db.removeTrack(id);
    return `This action removes a #${id} track`;
  }
}
