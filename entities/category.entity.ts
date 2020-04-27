import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";

@Index("fk_category_parent__category_id", ["parentCategoryId"], {})
@Index("uq_category_name", ["name"], { unique: true })
@Index("uq_category_video_path", ["videoPath"], { unique: true })
@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({ type: "varchar", unique: true, length: 32 })
  name: string;

  @Column({ type: "varchar", name: "video_path", unique: true, length: 128 })
  videoPath: string;

  @Column({ type: "int", name: "parent__category_id", nullable: true, unsigned: true })
  parentCategoryId: number | null;

  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "parent__category_id", referencedColumnName: "categoryId" },
  ])
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];

  @OneToOne(() => Video, (video) => video.videoPath2)
  video: Video;
}
