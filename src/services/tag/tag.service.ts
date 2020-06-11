import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/entities/tag.entity';
import { AddTagDto } from 'src/dtos/tag/add.tag.dto';
import { ApiResponse } from 'src/entities/misc/api.response.class';
import { EditTagDto } from 'src/dtos/tag/edit.tag.dto';

@Injectable()
export class TagService extends TypeOrmCrudService<Tag> {
    constructor(
        @InjectRepository(Tag)
        private readonly tag: Repository<Tag>
    ) {
        super(tag);
    }

    getAll(): Promise<Tag[]> {
        return this.tag.find();
    }

    getById(id: number): Promise<Tag> {
        return this.tag.findOne(id);
    }

        async add(data: AddTagDto): Promise<Tag | ApiResponse> {
        const newTag: Tag  = new Tag();
        newTag.name = data.name;

        const savedTag = await this.tag.save(newTag);
        
        return this.tag.findOne(savedTag.tagId)
        };

        //mechanism for editing existing Tag
        async editById(id: number, data: EditTagDto): Promise<Tag | ApiResponse> {
        const tag: Tag = await this.tag.findOne(id);
        tag.name = data.name;

        if (tag === undefined) {
        return new Promise((resolve) => {
            resolve(new ApiResponse("error", -1002));
            });
        }

        return this.tag.save(tag);
        }};