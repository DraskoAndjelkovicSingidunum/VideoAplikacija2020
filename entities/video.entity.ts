import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TagVideo } from "./tag.video.entity";
import { Category } from "./category.entity";

@Index("uq_video_video_path", ["videoPath"], { unique: true })
@Entity("video")
export class Video {
  @PrimaryGeneratedColumn({ type: "int", name: "video_id", unsigned: true })
  videoId: number;

  @Column({ type: "varchar", name: "video_path", unique: true, length: 128 })
  videoPath: string;

  @Column({ type: "varchar", length: 128 })
  title: string;

  @Column({ type: "varchar", length: 128 })
  description: string;

  @OneToMany(() => TagVideo, 
  tagVideo => tagVideo.video)
  tagVideos: TagVideo[];

  @OneToOne(() => Category, 
  category => category.video, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "video_path", referencedColumnName: "videoPath" }])
  videoPath2: Category;
}
