import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';

export class Favorite {
  artists: Array<Artist>;
  albums: Array<Album>;
  tracks: Array<Track>;

  constructor() {
    this.artists = new Array<Artist>();
    this.albums = new Array<Album>();
    this.tracks = new Array<Track>();
  }
}
