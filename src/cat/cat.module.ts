import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerMiddleware2 } from './logger2.middleware';

@Module({
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, LoggerMiddleware2)
      .forRoutes({ path: '/', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware2)
      .forRoutes({ path: '/', method: RequestMethod.POST });
  }
}
