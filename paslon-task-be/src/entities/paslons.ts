import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Votes } from "./votes";
import { Parties } from "./parties";

@Entity({ name: "paslons" })
export class Paslons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  vision: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Votes, (voter) => voter.paslon)
  votes: Votes[];

  @OneToMany(() => Parties, (party) => party.paslon)
  party: Parties[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  // posted_at: Date;

  // @Column({ type: "timestamp"})
  // updated_at: Date
}
