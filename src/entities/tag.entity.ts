import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TagVideo } from "./tag.video.entity";

@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_id", unsigned: true })
  tagId: number;

  @Column({ type: "varchar", unique: true, length: 32 })
  name: string;

  @OneToMany(() => TagVideo, 
  tagVideo => tagVideo.tag)
  tagVideos: TagVideo[];
}
