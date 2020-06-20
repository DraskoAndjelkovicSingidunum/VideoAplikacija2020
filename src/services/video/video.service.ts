import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from 'src/entities/video.entity';
import { AddVideoDto } from 'src/dtos/video/add.video.dto';
import { ApiResponse } from 'src/entities/misc/api.response.class';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class VideoService extends TypeOrmCrudService<Video> {
    constructor(
        @InjectRepository(Video) 
        private readonly video: Repository<Video>,
    
        @InjectRepository(Category)
        private readonly category: Repository<Category>,

    ) {
        super(video);
    }

    getAll(): Promise<Video[]> {
        return this.video.find();
    }

    getById(id: number): Promise<Video> {
        return this.video.findOne(id);
    }

    async createVideo(data: AddVideoDto): Promise<Video | ApiResponse> {
        const newVideo: Video  = new Video();
        newVideo.title       = data.title;
        newVideo.description = data.description;
        newVideo.videoPath   = data.videoPath;

        const savedVideo = await this.video.save(newVideo);

        const newCategory: Category = new Category();
        newCategory.videoId = savedVideo.videoId;
        newCategory.name    = data.name;
        
        this.category.save(newCategory);

        return await this.video.findOne(savedVideo.videoId, {
            relations: [
                "category"
            ]
        });
    }
}