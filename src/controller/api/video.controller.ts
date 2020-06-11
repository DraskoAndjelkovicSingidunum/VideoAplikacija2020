import { Controller, Param, Get, Put, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Video } from "src/entities/video.entity";
import { VideoService } from "src/services/video/video.service";
import { ApiResponse } from 'src/entities/misc/api.response.class';
import { AddVideoDto } from "src/dtos/video/add.video.dto";

@Controller('api/video')
@Crud({
    model: {
        type: Video
    },
    params: {
        id: {
            field: 'video_id',
            type: 'number',
            primary: true
        }
    },

    query: {
        join: {
            tagVideos: {
                eager: true
            },

            category: {
                eager: true
            }

        }
    }
})

export class VideoController {
    constructor(
        public videoService: VideoService) {}

        //GET http://localhost:3000/api/video/
        @Get() 
        getAll(): Promise<Video[]> {
            return this.videoService.getAll();
            }

        //GET http://localhost:3000/api/video/2
        @Get(':id') 
        getById(@Param('id') videoId: number): Promise<Video | ApiResponse>{
        return new Promise(async(resolve) => {
            const video = await this.videoService.getById(videoId);

            if(video === undefined) {
                resolve(new ApiResponse("error", -1002));
            }

            resolve(video);
        });
    }

        //PUT http://localhost:3000/api/video/createVideo/
        @Put('createVideo')
        createVideo( @Body() data: AddVideoDto): Promise<Video | ApiResponse> {
        return this.videoService.createVideo(data);
    }
}