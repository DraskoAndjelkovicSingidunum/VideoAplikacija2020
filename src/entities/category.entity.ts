import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";

@Index("fk_category_parent__category_id", ["parentCategoryId"], {})
@Index("uq_category_name", ["name"], { unique: true })
@Index("uq_category_video_id", ["videoId"], { unique: true })
@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({ type: "varchar", unique: true, length: 32 })
  name: string;

  @Column({ type: "int", name: "parent__category_id", nullable: true, unsigned: true })
  parentCategoryId: number | null;

  @Column({ type: "int", name: "video_id", unique: true, unsigned: true })
  videoId: number;

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

  @OneToOne(() => Video, (video) => video.category, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "video_id", referencedColumnName: "videoId" }])
  video: Video;
}