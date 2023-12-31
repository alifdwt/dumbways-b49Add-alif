import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
  Index,
} from "typeorm";

import { Paslons } from "./paslons";
import { Users } from "./users";

@Entity({ name: "votes" })
export class Votes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paslons, (paslon) => paslon.votes)
  paslon: Paslons;

  @Index({ unique: true })
  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column()
  voter_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
