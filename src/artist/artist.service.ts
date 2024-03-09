import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';
import { checkRecordExists, checkUUID } from 'src/utils/utils';

@Injectable()
export class ArtistService {
  constructor(private db: InMemoryDatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = new Artist();
    artist.id = v4();
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    return this.db.createNewArtist(artist);
  }

  findAll() {
    return this.db.getAllArtists();
  }

  findOne(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'artist', this.db);
    return this.db.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    checkUUID(id);
    checkRecordExists(id, 'artist', this.db);
    return `This action updates a #${id} artist`;
  }

  remove(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'artist', this.db);
    this.db.removeArtist(id);
    return `This action removes a #${id} artist`;
  }
}
