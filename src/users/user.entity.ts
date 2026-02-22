import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany : un User possède plusieurs Tasks.
  // 1er arg : entité cible (Task)
  // 2e arg : propriété inverse dans Task qui pointe vers User
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
