import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { AdministratorService } from './services/administrator/administrator.service';
import { Administrator } from 'entities/administrator.entity';
import { Category } from 'entities/category.entity';
import { Tag } from 'entities/tag.entity';
import { TagVideo } from 'entities/tag.video.entity';
import { Video } from 'entities/video.entity';
import { AdministratorController } from './controller/api/administrator.controller';

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
    ]),
  ],
  controllers: [AppController, AdministratorController],
  providers: [AdministratorService],
})
export class AppModule {}
