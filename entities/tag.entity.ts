import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TagVideo } from "./tag.video.entity";

@Entity("tag", { schema: "video_app" })
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_id", unsigned: true })
  tagId: number;

  @Column("varchar", { name: "name", length: 32, default: () => "'0'" })
  name: string;

  @OneToMany(() => TagVideo, (tagVideo) => tagVideo.tag)
  tagVideos: TagVideo[];
}
