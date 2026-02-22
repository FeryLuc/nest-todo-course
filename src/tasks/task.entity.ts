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
  //1er arg: spécifie a typeorm qelle entité est de l'autre coté de la relation. C'est spécifié la dite relation. 2e arg: indique la propriété sui pointe ici.
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
  @Column()
  userId: number;
}
