import { HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryDatabaseService } from 'src/inMemoryDatabase/inMemoryDatabase.service';
import { checkRecordExists, checkUUID } from 'src/utils/utils';

@Injectable()
export class FavoriteService {
  constructor(private db: InMemoryDatabaseService) {}

  findAll() {
    return this.db.getFavorites();
  }

  addNewTrack(trackId: string) {
    checkUUID(trackId);
    checkRecordExists(
      trackId,
      'track',
      this.db,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    this.db.addNewTrackToFavorites(trackId);
    return `The track with id ${trackId} was successfully added to the favorites`;
  }

  removeTrack(trackId: string) {
    checkUUID(trackId);
    checkRecordExists(
      trackId,
      'track',
      this.db,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    return this.db.removeTrackFromFavorites(trackId);
  }

  addNewAlbum(albumId: string) {
    checkUUID(albumId);
    checkRecordExists(
      albumId,
      'album',
      this.db,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    this.db.addNewAlbumToFavorites(albumId);
    return `The album with id ${albumId} was successfully added to the favorites`;
  }

  removeAlbum(albumId: string) {
    checkUUID(albumId);
    checkRecordExists(
      albumId,
      'album',
      this.db,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    return this.db.removeAlbumFromFavorites(albumId);
  }

  addNewArtist(artistId: string) {
    checkUUID(artistId);
    checkRecordExists(
      artistId,
      'artist',
      this.db,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    this.db.addNewArtistToFavorites(artistId);
    return `The artist with id ${artistId} was successfully added to the favorites`;
  }

  removeArtist(artistId: string) {
    checkUUID(artistId);
    checkRecordExists(
      artistId,
      'artist',
      this.db,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    return this.db.removeArtistFromFavorites(artistId);
  }
}
