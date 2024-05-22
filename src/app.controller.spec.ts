import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { CacheModule } from './cache/cache.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CacheModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(async () => {
    console.log('Closing app');
    //get cache manager
    const cacheManager = app.get(CACHE_MANAGER);
    //destroy cache manager
    await cacheManager.store.getClient().quit();
    await app.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      await expect(appController.getHello()).resolves.toEqual('Hello World!');
    });
  });
});
