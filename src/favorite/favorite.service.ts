import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { checkUUID } from 'src/utils/utils';

@Injectable()
export class FavoriteService {
  constructor(private db: DbService) {}

  async findFavorites() {
    let favorites = await this.db.favorites.findFirst();
    if (favorites) {
      return {
        albums: await this.db.album.findMany({
          where: { id: { in: favorites.albums } },
        }),
        artists: await this.db.artist.findMany({
          where: { id: { in: favorites.artists } },
        }),
        tracks: await this.db.track.findMany({
          where: { id: { in: favorites.tracks } },
        }),
      };
    } else {
      favorites = await this.db.favorites.create({
        data: { albums: [], artists: [], tracks: [] },
      });
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
  }

  async findAll() {
    let favorites = await this.db.favorites.findFirst();
    if (!favorites) {
      favorites = await this.db.favorites.create({
        data: { albums: [], artists: [], tracks: [] },
      });
    }
    return favorites;
  }

  async addNewTrack(trackId: string) {
    const favorites = await this.findAll();
    checkUUID(trackId);
    if (!(await this.db.track.findUnique({ where: { id: trackId } }))) {
      throw new HttpException(
        'Record does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (favorites.tracks.includes(trackId)) {
      return `The track with id ${trackId} has already been added to the favorites.`;
    } else {
      favorites.tracks.push(trackId);
      await this.db.favorites.update({
        where: { id: favorites.id },
        data: { tracks: { set: favorites.tracks } },
      });
      return `The track with id ${trackId} was successfully added to the favorites`;
    }
  }

  async removeTrack(trackId: string) {
    const favorites = await this.findAll();
    checkUUID(trackId);
    if (!(await this.db.track.findUnique({ where: { id: trackId } }))) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    if (!favorites.tracks.includes(trackId)) {
      throw new HttpException(
        'This record is not found in the favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    const trackIndex = favorites.tracks.findIndex((item) => item === trackId);
    favorites.tracks.splice(trackIndex, 1);
    return await this.db.favorites.update({
      where: { id: favorites.id },
      data: { tracks: { set: favorites.tracks } },
    });
  }

  async addNewAlbum(albumId: string) {
    const favorites = await this.findAll();
    checkUUID(albumId);
    if (!(await this.db.album.findUnique({ where: { id: albumId } }))) {
      throw new HttpException(
        'Record does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (favorites.albums.includes(albumId)) {
      return `The album with id ${albumId} has already been added to the favorites.`;
    } else {
      favorites.albums.push(albumId);
      await this.db.favorites.update({
        where: { id: favorites.id },
        data: { albums: { set: favorites.albums } },
      });
      return `The album with id ${albumId} was successfully added to the favorites`;
    }
  }

  async removeAlbum(albumId: string) {
    const favorites = await this.findAll();
    checkUUID(albumId);
    if (!(await this.db.album.findUnique({ where: { id: albumId } }))) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    if (!favorites.albums.includes(albumId)) {
      throw new HttpException(
        'This record is not found in the favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    const albumIndex = favorites.albums.findIndex((item) => item === albumId);
    favorites.albums.splice(albumIndex, 1);
    return await this.db.favorites.update({
      where: { id: favorites.id },
      data: { albums: { set: favorites.albums } },
    });
  }

  async addNewArtist(artistId: string) {
    const favorites = await this.findAll();
    checkUUID(artistId);
    if (!(await this.db.artist.findUnique({ where: { id: artistId } }))) {
      throw new HttpException(
        'Record does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (favorites.artists.includes(artistId)) {
      return `The artist with id ${artistId} has already been added to the favorites.`;
    } else {
      favorites.artists.push(artistId);
      await this.db.favorites.update({
        where: { id: favorites.id },
        data: { artists: { set: favorites.artists } },
      });
      return `The artist with id ${artistId} was successfully added to the favorites`;
    }
  }

  async removeArtist(artistId: string) {
    const favorites = await this.findAll();
    checkUUID(artistId);
    if (!(await this.db.artist.findUnique({ where: { id: artistId } }))) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    if (!favorites.artists.includes(artistId)) {
      throw new HttpException(
        'This record is not found in the favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    const artistIndex = favorites.artists.findIndex(
      (item) => item === artistId,
    );
    favorites.artists.splice(artistIndex, 1);
    return await this.db.favorites.update({
      where: { id: favorites.id },
      data: { artists: { set: favorites.artists } },
    });
  }
}
