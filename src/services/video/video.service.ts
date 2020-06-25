import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from 'src/entities/video.entity';
import { AddVideoDto } from 'src/dtos/video/add.video.dto';
import { ApiResponse } from 'src/entities/misc/api.response.class';
import { Category } from 'src/entities/category.entity';
import { EditVideoDto } from 'src/dtos/video/edit.video.dto';

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

    add(newVideo: Video): Promise<Video> {
        return this.video.save(newVideo);
    }

    async deleteById(id: number) {
        return await this.video.delete(id);
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

    async editFullVideo(videoId: number, data: EditVideoDto): Promise<Video | ApiResponse> {
        const existingVideo: Video = await this.video.findOne(videoId, {
            relations: ['category']
        });

        if (!existingVideo) {
            return new ApiResponse('error', -5001, "Video not found!");
        }

        existingVideo.title         = data.title;
        existingVideo.description   = data.description;

        const savedVideo = await this.video.save(existingVideo);
        if (!savedVideo) {
            return new ApiResponse('error', -5002, "Could not save new video data!");
        }

        const newCategory: string = data.name;
        const lastCategory: string = data.name;

        if (newCategory !== lastCategory) {
            const newCategory = new Category();
            newCategory.videoId = videoId;
            newCategory.categoryId = data.categoryId;
            newCategory.name = data.name;

            this.category.save(newCategory);
            if(!savedVideo) {
                return new ApiResponse('error', - 5003, 'Could not save new category!');
            }
        }

        return await this.video.findOne(videoId, {
            relations: [
                "category"
            ]
        });

    }
}