import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "pemilu" })
export class Pemilu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  vision: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  posted_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;
}
