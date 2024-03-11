import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (this.db.getTrackFromFavoritesById(trackId)) {
      return `The track with id ${trackId} has already been added to the favorites.`;
    } else {
      this.db.addNewTrackToFavorites(trackId);
      return `The track with id ${trackId} was successfully added to the favorites`;
    }
  }

  removeTrack(trackId: string) {
    checkUUID(trackId);
    checkRecordExists(trackId, 'track', this.db, HttpStatus.NOT_FOUND);
    if (!this.db.getTrackFromFavoritesById(trackId)) {
      throw new HttpException(
        'This record is not found in the favorites',
        HttpStatus.NOT_FOUND,
      );
    }
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
    if (this.db.getAlbumFromFavoritesById(albumId)) {
      return `The album with id ${albumId} has already been added to the favorites.`;
    } else {
      this.db.addNewAlbumToFavorites(albumId);
      return `The album with id ${albumId} was successfully added to the favorites`;
    }
  }

  removeAlbum(albumId: string) {
    checkUUID(albumId);
    checkRecordExists(albumId, 'album', this.db, HttpStatus.NOT_FOUND);
    if (!this.db.getAlbumFromFavoritesById(albumId)) {
      throw new HttpException(
        'This record is not found in the favorites',
        HttpStatus.NOT_FOUND,
      );
    }
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
    if (this.db.getArtistFromFavoritesById(artistId)) {
      return `The artist with id ${artistId} has already been added to the favorites.`;
    } else {
      this.db.addNewArtistToFavorites(artistId);
      return `The artist with id ${artistId} was successfully added to the favorites`;
    }
  }

  removeArtist(artistId: string) {
    checkUUID(artistId);
    checkRecordExists(artistId, 'artist', this.db, HttpStatus.NOT_FOUND);
    if (!this.db.getArtistFromFavoritesById(artistId)) {
      throw new HttpException(
        'This record is not found in the favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.db.removeArtistFromFavorites(artistId);
  }
}
