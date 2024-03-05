import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: true
    })
    organizationId: string;

    @Column('boolean', {
        default: false,
        nullable: true
    })
    emailVerified?: boolean;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        unique: true,
        default: null,
        nullable: true
    })
    verificationToken: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: false,
    })
    isAdmin: boolean;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

}