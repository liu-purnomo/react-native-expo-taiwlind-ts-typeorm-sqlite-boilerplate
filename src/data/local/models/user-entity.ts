import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("text")
  username: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  email: string;

  @Column("text", { nullable: true })
  avatar?: string | null;

  @Column("text")
  token: string;

  @Column("text")
  role: string;

  @Column("text")
  status: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
