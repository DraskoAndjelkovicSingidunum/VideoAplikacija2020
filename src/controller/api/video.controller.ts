import { Controller, Param, Get } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Video } from "src/entities/video.entity";
import { VideoService } from "src/services/video/video.service";
import { ApiResponse } from 'src/entities/misc/api.response.class';

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
}