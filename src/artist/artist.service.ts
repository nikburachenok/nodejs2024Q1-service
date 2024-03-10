import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';
import { checkRecordExists, checkUUID } from 'src/utils/utils';
import { validate } from 'class-validator';

@Injectable()
export class ArtistService {
  constructor(private db: InMemoryDatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    const errors = await validate(new CreateArtistDto(createArtistDto));
    if (errors.length > 0) {
      throw new HttpException('Wrong body', HttpStatus.BAD_REQUEST);
    }

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
    checkRecordExists(id, 'artist', this.db, HttpStatus.NOT_FOUND);
    return this.db.getArtistById(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const errors = await validate(new UpdateArtistDto(updateArtistDto));
    if (errors.length > 0) {
      throw new HttpException('Wrong body', HttpStatus.BAD_REQUEST);
    }
    checkUUID(id);
    checkRecordExists(id, 'artist', this.db, HttpStatus.NOT_FOUND);

    const artist: Artist = new Artist();
    artist.id = id;
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return this.db.updateArtist(id, artist);
  }

  remove(id: string) {
    checkUUID(id);
    checkRecordExists(id, 'artist', this.db, HttpStatus.NOT_FOUND);
    this.db.removeArtist(id);
    this.db.clearRemovedArtist(id);
    return `This action removes a #${id} artist`;
  }
}
