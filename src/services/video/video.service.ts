import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from 'src/entities/video.entity';
import { AddVideoDto } from 'src/dtos/video/add.video.dto';
import { ApiResponse } from 'src/entities/misc/api.response.class';
import { Category } from 'src/entities/category.entity';
import { Tag } from 'src/entities/tag.entity';

@Injectable()
export class VideoService extends TypeOrmCrudService<Video> {
    constructor(
        @InjectRepository(Video) 
        private readonly video: Repository<Video>,
    
        @InjectRepository(Category)
        private readonly category: Repository<Category>,

        @InjectRepository(Tag)
        private readonly tag: Repository<Tag>,
    ) {
        super(video);
    }

    getAll(): Promise<Video[]> {
        return this.video.find();
    }

    getById(id: number): Promise<Video> {
        return this.video.findOne(id);
    }

    async createFullVideo(data: AddVideoDto): Promise<Video | ApiResponse> {
        const newVideo: Video  = new Video();
        newVideo.title       = data.title;
        newVideo.description = data.description;
        newVideo.videoPath   = data.videopath;

        const savedVideo = await this.video.save(newVideo);

        /*const newCategory: Category = new Category();
        newCategory.videoPath = savedVideo.videoPath;
        newCategory.categoryName = 

        const savedCategory = await this.category.save(newCategory);*/

        /*const newTag: Tag = new Tag();
        newTag.name = savedtag.name;

        const savedtag = await this.tag.save(newTag);*/
    
        return await this.video.findOne(savedVideo.videoId, {
            relations: [
                "category",
                "tagVideo"
            ]
        });
    }
}