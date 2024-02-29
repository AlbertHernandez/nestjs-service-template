import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    // Add more columns and relationships as needed
}

