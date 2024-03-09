import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDatabase(): string {
    return 'Hello World!';
  }
}
