import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  getHello(): string {
    return 'Hello World!';
  }
}
