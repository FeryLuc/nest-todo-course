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
  //1er arg: spécifie a typeorm quelle entité est de l'autre coté de la relation. 2e arg: indique la propriété qui pointe ici (dans l'entité user, il y aura une propriété tasks qui contient des Task).
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
  @Column()
  userId: number;
}
