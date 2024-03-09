import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class InMemoryDatabaseService {
  users: Array<User>;
  albums: Array<Album>;
  tracks: Array<Track>;
  artists: Array<Artist>;

  constructor() {
    this.users = new Array<User>();
    this.albums = new Array<Album>();
    this.tracks = new Array<Track>();
    this.artists = new Array<Artist>();
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

  updateUser(id: string, user: User) {
    let oldUser = this.users.find((item) => item.id === id);
    oldUser = user;
    return oldUser;
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
}
