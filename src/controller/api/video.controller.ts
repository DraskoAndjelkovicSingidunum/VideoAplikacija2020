import { Controller, Param, Get, Put, Body, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Video } from "src/entities/video.entity";
import { VideoService } from "src/services/video/video.service";
import { ApiResponse } from 'src/entities/misc/api.response.class';
import { AddVideoDto } from "src/dtos/video/add.video.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageConfig } from "config/storage.config";
import { diskStorage } from "multer";

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

        //POST http://localhost:3000/api/video/:id/uploadVideo/
        @Post(':id/uploadVideo')
        @UseInterceptors(
            FileInterceptor('video', {
                storage: diskStorage({
                    destination: StorageConfig.videoDestination,
                    filename: (req, file, callback) => {
                        
                        const original = file.originalname;

                        let normalized = original.replace(/\s+/g, '-');
                        normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
                        const sada = new Date();
                        let datePart = '';
                        datePart += sada.getFullYear();
                        datePart += (sada.getMonth() + 1).toString();
                        datePart += sada.getDate().toString();

                        const randomPart: string = 
                        new Array(10)
                            .fill(0)
                            .map(e => (Math.random() * 9)
                            .toFixed(0)
                            .toString()).join(' ');

                        let fileName = datePart + '-' + randomPart + '-' + normalized;

                        fileName = fileName.toLocaleLowerCase();

                        callback(null, fileName);
                    }
                }),
                fileFilter: (req, file, callback) => {
                    // 1. Check ekstenzije: MP4
                    if (!file.originalname.toLowerCase().match(/\.(mp4)$/)) {
                        callback(new Error('Bad file extension!'), false);
                        return;
                    }

                    // 2. Check tipa sadrzaja: mpeg4 (mimetype)
                    if (!file.mimetype.includes('mp4')) {
                        callback(new Error('Bad file content!'), false);
                        return;
                    }

                    callback(null, true);
                },

                    // 3. Limit velicine upload-a videa
                limits: {
                    files: 1,
                    fieldSize: StorageConfig.videoMaxFileSize
                }
            })
        )
        async uploadVideo(@Param('id') videoId: number, @UploadedFile() video): Promise<ApiResponse | Video> {
            const newVideo: Video = new Video();
            newVideo.videoId        = videoId;
            newVideo.videoPath      = video.filename;

            const savedVideo = await this.videoService.add(newVideo);
            if (!savedVideo) {
                return new ApiResponse('error', -4001);
            }

            return savedVideo;
        }
}