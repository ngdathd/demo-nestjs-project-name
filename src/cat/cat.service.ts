import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  findAll(): string {
    return 'CatService findAll';
  }

  createOne(): string {
    return 'CatService createOne';
  }
}
