import { Controller, Put, Body, Get, Param, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Tag } from "src/entities/tag.entity";
import { TagService } from "src/services/tag/tag.service";
import { AddTagDto } from "src/dtos/tag/add.tag.dto";
import { ApiResponse } from "src/entities/misc/api.response.class";
import { EditTagDto } from "src/dtos/tag/edit.tag.dto";

@Controller('api/tag')
@Crud({
    model: {
        type: Tag
    },
    params: {
        id: {
            field: 'tag_id',
            type: 'number',
            primary: true
        }
    },

    query: {
        join: {
            tagVideos: {
                eager: true
            }
        }
    }
})

export class TagController {
    constructor(
        public tagService: TagService) {}

        //GET http://localhost:3000/api/tag/
        @Get() 
        getAll(): Promise<Tag[]> {
            return this.tagService.getAll();
            }

        //GET http://localhost:3000/api/tag/2
        @Get(':id') 
        getById(@Param('id') tagId: number): Promise<Tag | ApiResponse>{
        return new Promise(async(resolve) => {
            const tag = await this.tagService.getById(tagId);

            if(tag === undefined) {
                resolve(new ApiResponse("error", -1002));
            }

            resolve(tag);
        });
        }
       //PUT http://localhost:3000/api/tag/
       @Put()
       add(@Body() data: AddTagDto): Promise<Tag | ApiResponse> {
           return this.tagService.add(data);
        }
    
        //POST http://localhost:3000/api/tag/2
        @Post(':id')
        edit(@Param('id') id: number, @Body() data: EditTagDto): Promise<Tag | ApiResponse>{
            return this.tagService.editById(id, data);
        }
    
    };

 