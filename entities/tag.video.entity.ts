import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag.entity";
import { Video } from "./video.entity";

@Index("fk_tag_video_tag_id", ["tagId"], {})
@Index("fk_tag_video_video_id", ["videoId"], {})
@Entity("tag_video", { schema: "video_app" })
export class TagVideo {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_video_id", unsigned: true })
  tagVideoId: number;

  @Column("int", { name: "video_id", unsigned: true, default: () => "'0'" })
  videoId: number;

  @Column("int", { name: "tag_id", unsigned: true, default: () => "'0'" })
  tagId: number;

  @ManyToOne(() => Tag, (tag) => tag.tagVideos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "tagId" }])
  tag: Tag;

  @ManyToOne(() => Video, (video) => video.tagVideos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "video_id", referencedColumnName: "videoId" }])
  video: Video;
}
