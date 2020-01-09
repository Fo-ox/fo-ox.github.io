import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  name: string;
  @Column("text")
  surname: string;
  @Column({ length: 500 })
  patronymic?: string;
  @Column("text")
  date: Date;
  @Column("double")
  points?: number;
  @Column({ length: 500 })
  group?: string;
  @Column({ length: 500 })
  phone?: string;
  @Column({ length: 500 })
  email?: string;
  @Column()
  adress?: string;
}
