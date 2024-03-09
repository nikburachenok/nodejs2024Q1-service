import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { Album } from './entities/album.entity';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private db: InMemoryDatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
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
    return this.db.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    this.db.removeAlbum(id);
    return `This action removes a #${id} album`;
  }
}
