import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    BeforeUpdate,
} from 'typeorm';
import { Roles } from '../role/roles.entity';

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column({ select: false, type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'boolean', default: false })
    branch_owner: boolean;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    surname: string;

    @Column({ type: 'varchar', nullable: true })
    avatar: string;

    @Column({ type: 'varchar', length: 6, nullable: true })
    recpass: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ type: 'varchar', length: 150, nullable: true })
    address: string;
    
    @ManyToOne(() => Roles, (role) => role.id)
    role: Roles;

    @BeforeUpdate()
    async validate() {
        // validate logic...
    }

    static findById(id: number) {
        return this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
    }

    static findByEmail(email: string) {
        return this.createQueryBuilder('user')
            .addSelect('user.password')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.modules', 'modules')
            .where('user.email = :email', { email })
            .getOne();
    }
}
