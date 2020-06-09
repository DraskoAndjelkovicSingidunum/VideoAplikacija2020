import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { TagVideo } from "./tag.video.entity";

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

  @OneToOne(() => Category, (category) => category.video)
  category: Category;

  @OneToMany(() => TagVideo, (tagVideo) => tagVideo.video)
  tagVideos: TagVideo[];
}