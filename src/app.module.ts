import { Module } from '@nestjs/common';
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
    CategoryController
  ],
  providers: [
    AdministratorService,
    CategoryService
  ],
})
export class AppModule {}
