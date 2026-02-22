import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;

  // @ManyToOne : plusieurs Tasks appartiennent à un seul User.
  // 1er arg : entité cible (User)
  // 2e arg : propriété inverse dans User qui liste les tasks
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  // Colonne FK explicite pour filtrer sans charger la relation
  @Column()
  userId: number;
}
