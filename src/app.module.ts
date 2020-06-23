import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { AdministratorService } from './services/administrator/administrator.service';
import { Administrator } from 'src/entities/administrator.entity';
import { Category } from 'src/entities/category.entity';
import { Tag } from 'src/entities/tag.entity';
import { TagVideo } from 'src/entities/tag.video.entity';
import { Video } from 'src/entities/video.entity';
import { AdministratorController } from './controller/api/administrator.controller';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controller/api/category.controller';
import "reflect-metadata";
import { VideoController } from './controller/api/video.controller';
import { VideoService } from './services/video/video.service';
import { TagController } from './controller/api/tag.controller';
import { TagService } from './services/tag/tag.service';
import { AuthController } from './controller/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        Administrator,
        Category,
        Tag,
        TagVideo,
        Video
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      Category,
      Tag,
      TagVideo,
      Video
    ])
  ],
  controllers: [
    AppController, 
    AdministratorController,
    CategoryController,
    VideoController,
    TagController,
    AuthController
  ],
  providers: [
    AdministratorService,
    CategoryService,
    VideoService,
    TagService
  ],
  exports: [
    AdministratorService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/*').forRoutes('api/*');
  }
}
