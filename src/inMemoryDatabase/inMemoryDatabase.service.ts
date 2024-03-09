import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDatabaseService {
  users: [];
  albums: [];
  tracks: [];
  artists: [];

  constructor(users: [], albums: [], tracks: [], artists: []) {
    this.users = users;
    this.albums = albums;
    this.tracks = tracks;
    this.artists = artists;
  }
}
