import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Injectable()
export class InMemoryDatabaseService {
  users: Array<User>;
  albums: Array<Album>;
  tracks: Array<Track>;
  artists: Array<Artist>;
  favorite: Favorite;

  constructor() {
    this.users = new Array<User>();
    this.albums = new Array<Album>();
    this.tracks = new Array<Track>();
    this.artists = new Array<Artist>();
    this.favorite = new Favorite();
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((item) => item.id === id);
  }

  createNewUser(user: User) {
    this.users.push(user);
    return user;
  }

  updateUser(id: string, password: string) {
    const user = this.users.find((item) => item.id === id);
    user.password = password;
    ++user.version;
    user.updatedAt = Date.now();
    return user;
  }

  removeUser(id: string) {
    const indexToRemove = this.users.findIndex((item) => item.id === id);
    this.users.splice(indexToRemove, 1);
    return id;
  }

  getAllAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((item) => item.id === id);
  }

  createNewAlbum(album: Album) {
    this.albums.push(album);
    return album;
  }

  updateAlbum(id: string, album: Album) {
    let oldAlbum = this.albums.find((item) => item.id === id);
    oldAlbum = album;
    return oldAlbum;
  }

  removeAlbum(id: string) {
    const indexToRemove = this.albums.findIndex((item) => item.id === id);
    this.albums.splice(indexToRemove, 1);
    return id;
  }

  getAllTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((item) => item.id === id);
  }

  createNewTrack(track: Track) {
    this.tracks.push(track);
    return track;
  }

  updateTrack(id: string, track: Track) {
    let oldTrack = this.tracks.find((item) => item.id === id);
    oldTrack = track;
    return oldTrack;
  }

  removeTrack(id: string) {
    const indexToRemove = this.tracks.findIndex((item) => item.id === id);
    this.tracks.splice(indexToRemove, 1);
    return id;
  }

  getAllArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    return this.artists.find((item) => item.id === id);
  }

  createNewArtist(artist: Artist) {
    this.artists.push(artist);
    return artist;
  }

  updateArtist(id: string, artist: Artist) {
    let oldArtist = this.artists.find((item) => item.id === id);
    oldArtist = artist;
    return oldArtist;
  }

  removeArtist(id: string) {
    const indexToRemove = this.artists.findIndex((item) => item.id === id);
    this.artists.splice(indexToRemove, 1);
    return id;
  }

  checkRecordExists(id: string, type: string) {
    let result: number;
    if (type === 'user') {
      result = this.users.findIndex((item) => item.id === id);
    } else if (type === 'album') {
      result = this.albums.findIndex((item) => item.id === id);
    } else if (type === 'artist') {
      result = this.artists.findIndex((item) => item.id === id);
    } else if (type === 'track') {
      result = this.tracks.findIndex((item) => item.id === id);
    }

    return result;
  }

  clearRemovedArtist(artistId: string) {
    const albums = this.albums.filter((item) => item.artistId === artistId);
    albums.forEach((item) => {
      item.artistId = null;
    });
    const tracks = this.tracks.filter((item) => item.artistId === artistId);
    tracks.forEach((item) => {
      item.artistId = null;
    });

    if (this.favorite.artists.findIndex((item) => item.id === artistId) >= 0) {
      this.removeArtistFromFavorites(artistId);
    }
  }

  clearRemovedAlbum(albumId: string) {
    const tracks = this.tracks.filter((item) => item.albumId === albumId);
    tracks.forEach((item) => {
      item.albumId = null;
    });

    if (this.favorite.albums.findIndex((item) => item.id === albumId) >= 0) {
      this.removeAlbumFromFavorites(albumId);
    }
  }

  clearRemovedTrack(trackId: string) {
    if (this.favorite.tracks.findIndex((item) => item.id === trackId) >= 0) {
      this.removeTrackFromFavorites(trackId);
    }
  }

  getUserPasswordById(userId: string) {
    return this.users.find((item) => item.id === userId).password;
  }

  getFavorites() {
    return this.favorite;
  }

  addNewTrackToFavorites(trackId: string) {
    this.favorite.tracks.push(this.tracks.find((item) => item.id === trackId));
  }

  addNewAlbumToFavorites(albumId: string) {
    this.favorite.albums.push(this.albums.find((item) => item.id === albumId));
  }

  addNewArtistToFavorites(artistId: string) {
    this.favorite.artists.push(
      this.artists.find((item) => item.id === artistId),
    );
  }

  removeTrackFromFavorites(trackId: string) {
    const trackIndex = this.favorite.tracks.findIndex(
      (item) => item.id === trackId,
    );
    this.favorite.tracks.splice(trackIndex, 1);
  }

  removeAlbumFromFavorites(albumId: string) {
    const albumIndex = this.favorite.albums.findIndex(
      (item) => item.id === albumId,
    );
    this.favorite.albums.splice(albumIndex, 1);
  }

  removeArtistFromFavorites(artistId: string) {
    const artistIndex = this.favorite.artists.findIndex(
      (item) => item.id === artistId,
    );
    this.favorite.artists.splice(artistIndex, 1);
  }
}
