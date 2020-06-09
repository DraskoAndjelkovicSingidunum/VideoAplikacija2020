import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";
import { Video } from "./video.entity";

@Index("uq_tag_video_video_id_tag_id", ["videoId", "tagId"], { unique: true })
@Index("fk_tag_video_tag_id", ["tagId"], {})
@Entity("tag_video")
export class TagVideo {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_video_id", unsigned: true })
  tagVideoId: number;

  @Column({ type: "int", name: "video_id", unsigned: true })
  videoId: number;

  @Column({ type: "int", name: "tag_id", unsigned: true })
  tagId: number;

  @ManyToOne(() => Tag, 
  tag => tag.tagVideos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "tagId" }])
  tag: Tag;

  @ManyToOne(() => Video, 
  video => video.tagVideos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "video_id", referencedColumnName: "videoId" }])
  video: Video;
}
