import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('tasks') : mappe la classe à la table 'tasks' en BDD.
// TypeORM crée/synchronise la table automatiquement (synchronize: true).
@Entity('tasks')
export class Task {
  // @PrimaryGeneratedColumn : colonne id auto-incrémentée
  @PrimaryGeneratedColumn()
  id: number;

  // @Column : mappe une propriété à une colonne de la table
  @Column()
  title: string;

  // @Column avec options : valeur par défaut
  @Column({ default: false })
  done: boolean;
}
