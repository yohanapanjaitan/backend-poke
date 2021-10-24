import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'user'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:'email'})
  email: string;

  @Column({name:'name'})
  name: string;

  @Column()
  password: string;
}
