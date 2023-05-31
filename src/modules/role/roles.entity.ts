import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('roles')
export class Roles extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    role: string;

    @Column({ type: 'varchar', nullable: false, default: '' })
    description: string;

    @Column({ type: 'int', nullable: false, default: 1 })
    level: number;

    @OneToMany((type) => User, (product) => product.id)
    user: User[];
}
